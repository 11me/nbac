import { ref } from 'vue';
import { Alert } from '@/models'
import { Err } from '@/models';


const alert = ref<string>('');

const alerts: Alert = {
  SelectSQL: `There was an syntax error, please check syntax`,
  TypeErr: `There was an type error, please check type`
}


export function setAlert(err: Err): void {
  // const key = err.message.split(':')[1].trim()
  alert.value = err.message
}

export function useAlert() {
  return { alert }
}
