<template>
  <a-modal v-model:visible="isVisible" width="980px" :centered="true" :footer="null"
           wrapClassName="modal" :afterClose="handleCancel">
    <div class="modal-wrap">
      <a-steps :current="current" class="modal__steps" v-if="!this.isTimeExpired">
        <a-step v-for="item in steps" :key="item.title" :title="item.title"/>
      </a-steps>
      <!--    First step -->
      <div v-if="current === 0" class="step-content">
        <warning-step></warning-step>
      </div>
      <!--    Second step -->
      <div v-if="current === 1" class="step-content">
        <seats-picking-step></seats-picking-step>
      </div>
      <!--    Last step -->
      <div v-if="current === 2" class="step-content">
        <checkout-step></checkout-step>
      </div>
    </div>

    <div class="steps-action" :class="this.isTimeExpired ? 'centered' : ''">
      <a-button v-if="current > 1 && !isTimeExpired" style="margin-left: 8px" @click="prev">
        Назад
      </a-button>
      <a-button v-if="current === 0" type="primary" @click="next">
        Продолжить
      </a-button>
      <chosen-seats-info v-if="current === 1 && tickets.length > 0" type="crop"></chosen-seats-info>
      <a-button v-if="current === 1" type="primary" @click="next"
                :disabled="isDisabled">
        Перейти к оплате
      </a-button>
<!--      <a-button-->
<!--          v-if="current == steps.length - 1 && !this.isTimeExpired"-->
<!--          type="primary"-->
<!--          @click="handleSuccess"-->
<!--      >-->
<!--        Оплатить {{ tickets.length * session.price }}₽-->
<!--      </a-button>-->
      <a-button
          v-if="current == steps.length - 1 && this.isTimeExpired"
          type="primary"
          @click="handleCancel">
        Вернуться к расписанию сеансов
      </a-button>
    </div>
  </a-modal>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import WarningStep from './WarningStep';
import ChosenSeatsInfo from './ChosenSeatsInfo';
import SeatsPickingStep from './SeatsPickingStep';
import CheckoutStep from './CheckoutStep';

export default {
  name: 'CheckoutModal',
  components: { WarningStep, SeatsPickingStep, CheckoutStep, ChosenSeatsInfo },
  data() {
    return {
      current: 0,
      isVisible: false,
      isDisabled: true,
      steps: [
        {
          title: 'Прочитайте условия',
        },
        {
          title: 'Выберите места',
        },
        {
          title: 'Оплатите билеты',
        },
      ]
    };
  },
  computed: {
    ...mapState({
      checkoutModalVisible: state => state.checkoutModalVisible,
      tickets: state => state.selectedTickets,
      session: state => state.selectedSession,
      isTimeExpired: state => state.isTimeExpired
    })
  },
  methods: {
    ...mapMutations({
      setCheckoutModalVisible: 'setCheckoutModalVisible',
      clearTickets: 'clearTickets'
    }),
    handleCancel() {
      this.setCheckoutModalVisible(false);
    },
    handleSuccess() {
      this.setCheckoutModalVisible(false);
    },
    next() {
      this.current++;
    },
    prev() {
      this.current--;
    }
  },
  watch: {
    checkoutModalVisible(newValue) {
      if(newValue === false) {
        this.current = 0;
        this.clearTickets();
      }
      this.isVisible = (newValue);
    },
    tickets(newValue) {
      this.isDisabled = !newValue.length;
    }
  },
  beforeMount() {
    if (this.isVisible === true) {
      this.isVisible = false;
      this.setCheckoutModalVisible(false);
    }
  }
};
</script>

<style>
.modal-wrap {
  padding: 35px 30px 0 30px;
}

.step-content {
  margin-top: 20px;
  margin-bottom: 50px;
}

.steps-action {
  padding-right: 30px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.centered {
  justify-content: center;
}

@media (max-width: 440px) {
  .modal .ant-modal {
    min-width: 360px;
  }

  .modal-wrap {
    padding: 35px 15px 0 15px;
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