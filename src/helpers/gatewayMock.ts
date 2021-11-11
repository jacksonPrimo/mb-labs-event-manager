import axios from 'axios';
interface paymentObject {
  cardToken: string;
  amount: number;
  metadata: any;
}
export async function pay (payment: paymentObject) {
  // simulação de pagamento
  setTimeout(async () => {
    const objectToSend = {
      id: payment.metadata.reserveId,
      status: (Math.random() * 10) < 5 ? 'paid' : 'fail'
    };
    const host = process.env.HOST || 'http://localhost';
    const port = process.env.PORT || 3000;
    await axios.put(`${host}:${port}/webhooks/reserves`, objectToSend);
  }, 5000);
}
