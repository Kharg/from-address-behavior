define('from-address-behavior:views/admin/settings', ['views/settings/record/edit'], (SettingsEditRecordView) => {
    return class extends SettingsEditRecordView {

        gridLayoutType = 'record'

        buttonList = [
            {
                name: 'save',
                label: 'Save',
                style: 'primary',
                title: 'Ctrl+Enter',
            },
            {
                name: 'cancel',
                label: 'Cancel',
            },
            {
                name: 'resetToDefault',
                label: 'Restore',
            }
        ];

        detailLayout = [
            {
                "rows": [
                    [{"name": "emailAddressFromFieldBehavior"}],
                    [{"name": "predefinedCustomFromAddress"}]
                ],
                "style": "default",
                "label": "From Address Behavior"
            }
        ];

    dynamicLogicDefs = {
        fields: {
            predefinedCustomFromAddress: {
                visible: {
                    conditionGroup: [
                        {
                            attribute: "emailAddressFromFieldBehavior",
                            type: "equals",
                            value: "usePredefinedFromAddress"
                        }
                    ]
                },
                required: {
                    conditionGroup: [
                        {
                            attribute: "emailAddressFromFieldBehavior",
                            type: "equals",
                            value: "usePredefinedFromAddress"
                        }
                    ]
                }
            }
        }
    }

        setup() {
            super.setup();

            this.events['click button[data-action="save"]'] = () => {
                this.actionSave();
                this.broadcastUpdate();
            };
            
            this.events['click button[data-action="cancel"]'] = () => {
                this.cancel();
            };
            
            this.events['click button[data-action="resetToDefault"]'] = () => {
                this.confirm(this.translate('confirmation', 'messages'), () => {
                    this.resetToDefault();
                    this.broadcastUpdate();
                });
            };
        }

        afterSave() {
            super.afterSave();
            window.location.reload();
        }
    
        resetToDefault() {
            Espo.Ajax
            .putRequest('Settings/1', {
                emailAddressFromFieldBehavior: this.getMetadata().get(['entityDefs', this.scope, 'fields', 'emailAddressFromFieldBehavior', 'default']),
                predefinedCustomFromAddress: this.getMetadata().get(['entityDefs', this.scope, 'fields', 'predefinedCustomFromAddress', 'default']),
            })
            .then(response => {
                this.model.fetch();
                window.location.reload();
            });
        }

        broadcastUpdate() {
            this.getHelper().broadcastChannel.postMessage('reload');
        }

    }
});