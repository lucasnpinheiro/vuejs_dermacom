import Paciente from './paciente.vue';
import PacienteEdit from './paciente-edit.vue';

export default [
  {
    name: 'Paciente', path: '/paciente', component: Paciente
  },
  {
    name: 'PacienteEdit', path: '/pacienteEdit/:id', component: PacienteEdit
  }
]