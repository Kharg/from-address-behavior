define('from-address-behavior:views/email/fields/compose-from-address', ['views/email/fields/compose-from-address'], (BaseFieldView ) => {

    return class extends BaseFieldView  {
 
    setup() {
      super.setup();

      if (this.getConfig().get('emailAddressFromFieldBehavior') === 'emptyEmailAddress') {
        this.list.unshift('');
      }
      if (this.getConfig().get('emailAddressFromFieldBehavior') === 'usePredefinedFromAddress') {
        const preselectedEmail = this.getConfig().get('predefinedCustomFromAddress');
        this.list.unshift(preselectedEmail);
      }
    }
  };
});