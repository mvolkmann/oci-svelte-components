<script>
  // This is an interesting approach to handling the
  // association between a component and global state.
  // For example, the following renders an
  // instance of the Input component.
  //
  // <State
  //   component={Input}
  //   label="Middle Name"
  //   path="user.profile.middleName" />
  //
  // You can pass any props to this component.
  // The props "component" and "path" are only used by this component.
  // All other props are passed on to the specified component.
  // This uses the "path" prop to retrieve a value from $globalStore.
  // That value is passed to the specified component.
  // The specified component is expected to dispatch a "value" event
  // when the user changes the value.
  // This component handles the "value" event by updating
  // the value in $globalStore at the specified path.

  import get from 'lodash-es/get';
  import {globalStore, update} from './stores';

  export let component;
  export let path;

  $: value = get($globalStore, path);

  const props = {...$$props};
  delete props.component;
  delete props.path;

  const handleValue = event => update(globalStore, path, event.detail);
</script>

<svelte:component this={component} {value} on:value={handleValue} {...props} />
