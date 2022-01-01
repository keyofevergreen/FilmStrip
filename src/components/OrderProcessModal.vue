<template>
  <a-modal v-model:visible="isVisible" width="980px" centered="true" :footer="null"
           :bodyStyle="{padding: '50px 30px 20px 30px'}"
           wrapClassName="modal" @ok="handleOk" :afterClose="handleCancel">
    <a-steps :current="current">
      <a-step v-for="item in steps" :key="item.title" :title="item.title"/>
    </a-steps>
    <div v-if="current === 0" class="step-content">
      <h2>Дорогие гости, просим принять во внимание меры предосторожности в связи с эпидемиологической ситуацией:</h2>
      <ul>
        <li>Соблюдайте правила личной гигиены</li>
        <li>Пользуйтесь бесконтактными способами оплаты</li>
        <li>Соблюдайте социальную дистанцию на расстоянии не менее 1,5 метра</li>
        <li>Воздержитесь от посещения кинотеатра при наличии симптомов, характерных для ОРВИ</li>
      </ul>
      <p><strong>Для посещения кинотеатра так же необходим QR-код, подтверждающий вакцинацию от коронавируса</strong>
      </p>
    </div>
    <div v-else-if="current === 1" class="step-content">
      <div class="film-header">
        <h1>{{ film.nameRu }}</h1>
        <div class="tags-container">
          <my-tag :text="ageLimits" class="film-header__age-limits"></my-tag>
          <my-tag :text="session.format" class="film-header__format"></my-tag>
        </div>
        <p class="film-header__cinema">{{ session.cinema.name }}, Зал {{ session.hall }}</p>
      </div>
      <div class="overflow-wrapper">
        <tickets-picker :hall="hall"/>
      </div>
    </div>
    <div v-else-if="current === 2" class="step-content">
      Оформление заказа
    </div>
    <div class="steps-action">
      <a-button v-if="current > 0" style="margin-left: 8px" @click="prev">
        Назад
      </a-button>
      <a-button v-if="current < steps.length - 1" type="primary" @click="next">
        Продолжить
      </a-button>
      <a-button
          v-if="current == steps.length - 1"
          type="primary"
          @click="handleSuccess"
      >
        Оформить
      </a-button>
    </div>
  </a-modal>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import TicketsPicker from './TicketsPicker';
import MyTag from './UI/MyTag';

export default {
  name: 'OrderProcessModal',
  components: { TicketsPicker, MyTag },
  data() {
    return {
      hall: [
        {
          row: 1,
          seats: [
            { seat: 1, isOccupied: false },
            { seat: 2, isOccupied: false },
            { seat: 3, isOccupied: true },
            { seat: 4, isOccupied: true },
            { seat: 5, isOccupied: false },
            { seat: 6, isOccupied: false },
            { seat: 7, isOccupied: false },
            { seat: 8, isOccupied: false },
            { seat: 9, isOccupied: false },
            { seat: 10, isOccupied: false }
          ]
        },
        {
          row: 2,
          seats: [
            { seat: 1, isOccupied: false },
            { seat: 2, isOccupied: false },
            { seat: 3, isOccupied: false },
            { seat: 4, isOccupied: false },
            { seat: 5, isOccupied: false },
            { seat: 6, isOccupied: false },
            { seat: 7, isOccupied: false },
            { seat: 8, isOccupied: false },
            { seat: 9, isOccupied: false },
            { seat: 10, isOccupied: false }
          ]
        },
        {
          row: 3,
          seats: [
            { seat: 1, isOccupied: false },
            { seat: 2, isOccupied: false },
            { seat: 3, isOccupied: false },
            { seat: 4, isOccupied: true },
            { seat: 5, isOccupied: true },
            { seat: 6, isOccupied: true },
            { seat: 7, isOccupied: false },
            { seat: 8, isOccupied: false },
            { seat: 9, isOccupied: false },
            { seat: 10, isOccupied: false }
          ]
        },
        {
          row: 4,
          seats: [
            { seat: 1, isOccupied: false },
            { seat: 2, isOccupied: false },
            { seat: 3, isOccupied: false },
            { seat: 4, isOccupied: false },
            { seat: 5, isOccupied: false },
            { seat: 6, isOccupied: true },
            { seat: 7, isOccupied: true },
            { seat: 8, isOccupied: false },
            { seat: 9, isOccupied: false },
            { seat: 10, isOccupied: false }
          ]
        },
        {
          row: 5,
          seats: [
            { seat: 1, isOccupied: false },
            { seat: 2, isOccupied: false },
            { seat: 3, isOccupied: true },
            { seat: 4, isOccupied: false },
            { seat: 5, isOccupied: true },
            { seat: 6, isOccupied: true },
            { seat: 7, isOccupied: false },
            { seat: 8, isOccupied: false },
            { seat: 9, isOccupied: false },
            { seat: 10, isOccupied: false }
          ]
        }
      ],
      current: 0,
      isVisible: false,
      steps: [
        {
          title: 'Прочитайте условия',
        },
        {
          title: 'Выберете места',
        },
        {
          title: 'Оформите покупку',
        },
      ]
    }
  },
  methods: {
    ...mapMutations({
      setTicketsPickerModalVisible: 'setTicketsPickerModalVisible',
      clearTickets: 'clearTickets'
    }),
    handleCancel() {
      this.current = 0;
      this.setTicketsPickerModalVisible(false);
      this.clearTickets();
    },
    handleOk() {
      this.current += 1;
    },
    handleSuccess() {
      this.current = 0;
      this.setTicketsPickerModalVisible(false);
      this.clearTickets();
    },
    next() {
      this.current++;
    },
    prev() {
      this.current--;
    },
  },
  computed: {
    ...mapState({
      ticketsPickerModalVisible: state => state.ticketsPickerModalVisible,
      film: state => state.selectedFilm,
      ageLimits: state => state.ageLimitsOfSelectedFilm,
      session: state => state.selectedSession
    })
  },
  watch: {
    ticketsPickerModalVisible(newValue) {
      this.isVisible = (newValue);
    }
  }
}
</script>

<style>
.step-content {
  margin-top: 20px;
  margin-bottom: 50px;
}

.overflow-wrapper {
  overflow: auto;
}

.steps-action {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.film-header__age-limits {
  border: 1px dashed var(--pretty-black);
}

.tags-container {
  display: flex;
  align-items: center;
  gap: 15px;
}

.film-header__format {
  color: #fff;
  background-color: var(--green);
}

.film-header__cinema {
  font-size: 16px;
  color: var(--grey);
  margin-top: 10px;
}

@media (max-width: 760px) {
  .overflow-wrapper {
    max-height: 350px;
    padding-bottom: 40px;
  }
}

@media (max-width: 440px) {
  .modal {
    min-width: 360px;
  }

  .modal .ant-modal-body h2 {
    font-size: 14px;
  }

  .modal .ant-modal-body li,
  .modal .ant-modal-body p {
    font-size: 15px;
  }
}
</style>