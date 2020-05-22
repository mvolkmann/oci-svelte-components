<script>
  import MockWizardStep from './MockWizardStep.svelte';
  import Wizard from '../src/Wizard.svelte';

  const steps = [
    {title: 'Address', component: MockWizardStep, props: {name: 'address'}},
    {title: 'Personal', component: MockWizardStep, props: {name: 'personal'}},
    {title: 'Account', component: MockWizardStep, props: {name: 'account'}}
  ];
</script>

<Wizard {steps} />
