<template>
  <div>
    <div class="ticket-item">
      <div class="ticket-item__info">
        <h1 class="info-film-name">{{ ticket.filmName }} {{ ticket.session.format === '3D' ? '3D' : null }}</h1>
        <h2 class="info-film-time">{{ ticket.session.time }}</h2>
      </div>
      <div class="ticket-item__qr-code-wrap">
        <svg xmlns="http://www.w3.org/2000/svg" class="ticket-item__qr-code-btn" @click="showQrCodeModal">
          <use :href='`${qrcode}#qr-code`'></use>
        </svg>
        <span class="divider__description">Контроль</span>
      </div>
      <div class="water-mark ticket-item__ageLimits">{{ ticket.ageLimits }}</div>
    </div>
    <div class="order-info"><span>Заказ №{{ ticket.id }}</span><span>Тип оплаты: {{ ticket.paymentMethod }}</span></div>
  </div>
  <a-modal v-model:visible="isVisible" :centered="true" width="620px" :footer="null" :afterClose="handleCancel"
           :closable="false" wrapClassName="modal">
    <div class="modal-wrap">
      <h3 class="modal__cinema-name">{{ ticket.session.cinema.name }}</h3>
      <h1 class="modal__film-name">{{ ticket.filmName }} {{ ticket.session.format === '3D' ? '3D' : null }}</h1>
      <div class="modal__qr-code-wrap">
        <qrcode-vue size="230" value="https://www.youtube.com/watch?v=dQw4w9WgXcQ" level="H"/>
      </div>
      <p class="modal__qr-code-description">Покажите контроллеру перед входом в зал</p>
      <div>
        <h1 class="modal__hall-number">Зал {{ Number(ticket.session.hall) }}</h1>
        <div>
          <p class="modal__seat-info" v-for="seat in ticket.ticketsInfo" :key="seat.id"> Ряд {{ seat.row }}, место
            {{ seat.seat }}</p>
        </div>
      </div>
    </div>
  </a-modal>
</template>

<script>
import QrcodeVue from 'qrcode.vue';
import qrcode from '../assets/qr-code-icon.svg';

export default {
  name: 'TicketsItem',
  components: { QrcodeVue },
  props: {
    ticket: {
      type: Object
    }
  },
  data() {
    return {
      qrcode,
      isVisible: false,
    };
  },
  methods: {
    showQrCodeModal() {
      this.isVisible = true;
    },
    handleCancel() {
      this.isVisible = false;
    },
  }
};
</script>

<style scoped>
.modal .ant-modal {
  min-width: 360px;
}

.ticket-item {
  position: relative;
  display: flex;
  gap: 20px;
  padding: 20px 10px 20px 20px;
  overflow: hidden;
  border: 1px solid var(--light-grey);
  border-left: 4px solid var(--green);
  border-radius: 15px;
  box-shadow: 0 4px 8px 0 rgb(0 0 0 / 6%);
}

.ticket-item__info {
  flex-grow: 1;
  border-right: 1px dashed var(--grey);
}

.water-mark {
  position: absolute;
  color: var(--light-grey);
  opacity: 0.4;
}

.ticket-item__ageLimits {
  bottom: -33px;
  left: 10px;
  font-size: 70px;
}

.info-film-name {
  font-weight: 400;
  font-size: 20px;
}

.ticket-item__qr-code-wrap {
  display: flex;
  gap: 5px;
}

.divider__description {
  font-family: 'Integer', sans-serif;
  text-align: center;
  text-transform: uppercase;
  writing-mode: vertical-lr;
}

.ticket-item__qr-code-btn {
  width: 120px;
  height: 120px;
  cursor: pointer;
  transition: fill 0.4s;
}

.ticket-item__qr-code-btn:hover {
  fill: var(--green);
}

.order-info {
  display: flex;
  gap: 15px;
  justify-content: flex-end;
  margin-top: 8px;
  margin-left: 15px;
  font-size: 12px;
}

.modal-wrap {
  display: flex;
  flex-direction: column;
  padding: 10px;
}

.modal__cinema-name {
  color: var(--grey);
  font-weight: 400;
  text-align: center;
}

.modal__film-name {
  margin-bottom: 40px;
  font-size: 35px;
  text-align: center;
}

.modal__qr-code-wrap {
  display: flex;
  justify-content: center;
}

.modal__qr-code-description {
  margin-top: 10px;
  margin-bottom: 20px;
  text-align: center;
}

.modal__hall-number {
  margin-bottom: 0;
  text-align: center;
}

.modal__seat-info {
  margin-bottom: 0;
  font-size: 20px;
  text-align: center;
}

@media (max-width: 500px) {
  .info-film-name {
    font-size: 15px;
  }

  .ticket-item__qr-code-btn {
    width: 100px;
    height: 100px;
  }

  .modal__film-name {
    font-size: 25px;
    text-align: center;
  }
}
</style>