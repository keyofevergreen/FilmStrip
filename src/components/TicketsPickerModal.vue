<template>
  <a-modal v-model:visible="isVisible" width="980px" centered="true" :footer="null"
           :bodyStyle="{padding: '50px 50px 20px 50px'}"
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
      Проверка2
    </div>
    <div v-else-if="current === 2" class="step-content">
      Проверка3
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

export default {
  name: 'TicketsPickerModal',
  data() {
    return {
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
      setTicketsPickerModalVisible: 'setTicketsPickerModalVisible'
    }),
    handleCancel() {
      this.current = 0;
      this.setTicketsPickerModalVisible(false);
    },
    handleOk() {
      this.current += 1;
    },
    handleSuccess() {
      this.current = 0;
      this.setTicketsPickerModalVisible(false);
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
      ticketsPickerModalVisible: state => state.ticketsPickerModalVisible
    })
  },
  watch: {
    ticketsPickerModalVisible(newValue) {
      this.isVisible = (newValue);
    }
  }
}
</script>

<style scoped>
.step-content {
  margin-top: 20px;
  margin-bottom: 50px;
}

.steps-action {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
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