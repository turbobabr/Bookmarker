
(function(){

    var root=this;

    var UI = {};

    var AlertFieldType = {
        Boolean: "boolean",
        String: "string",
        Number: "number",
        Select: "select"
    };

    UI.AlertFieldType = AlertFieldType;


    UI.showAlert = function(alert) {
        var window=COSAlertWindow.new();

        if(alert.icon) {

            // var iconFilePath=sketch.scriptPath.stringByDeletingLastPathComponent()+alert.icon;
            // var icon = NSImage.alloc().initByReferencingFile(iconFilePath);
            var icon=fs.image(alert.icon);
            window.setIcon(icon);
        }

        var index=0;

        if(isDefined(alert.title)) window.setMessageText(alert.title);
        if(isDefined(alert.description)) window.setInformativeText(alert.description);


        function isDefined(obj) {
            return !isUndefined(obj);
        }

        function isUndefined(obj) {
            return obj === void 0;
        }

        function createComboBox(items, selectedItemIndex) {
            selectedItemIndex = selectedItemIndex || 0

            var comboBox = NSComboBox.alloc().initWithFrame(NSMakeRect(0, 0, 300, 25));
            comboBox.addItemsWithObjectValues(items);
            comboBox.selectItemAtIndex(selectedItemIndex);

            return comboBox;
        }

        var firstResponderView=null;

        // Process fields.
        for(var key in alert.fields) {
            var field=alert.fields[key];

            if(isDefined(field.label) && !(field.control && field.control=="checkbox")) {
                window.addTextLabelWithValue(field.label);
                index+=1;
            }

            if(isDefined(field.type) && field.type==AlertFieldType.Select) {
                var selectedItem=0;
                for(var i=0;i<field.value.length;i++) {
                    if(field.value[i]==field.defaultValue) {
                        selectedItem=i;
                        break;
                    }
                }
                window.addAccessoryView(createComboBox(field.value,selectedItem));
                if(isUndefined(field.getter)){
                    field.getter = function(value) {
                        return value;
                    };
                }
            }

            if(isDefined(field.type) && field.type==AlertFieldType.Boolean) {

                if(isUndefined(field.trueValue)) field.trueValue="Yes";
                if(isUndefined(field.falseValue)) field.falseValue="No";

                function createCheckbox(checked) {
                    var myCheckBox = [[NSButton alloc] initWithFrame:NSMakeRect(0,0,300,25)];
                    [myCheckBox setButtonType:NSSwitchButton];
                    myCheckBox.setTitle(field.label);
                    myCheckBox.setState(NSOnState);
                    [myCheckBox setBezelStyle:0];  // This is unnecessary. I include it to show that checkboxes don't have a bezel style.

                    return myCheckBox;
                }

                function createControl() {
                    if(isUndefined(field.control)) field.control="combo";
                    if(field.control.toLowerCase()=="combo") return createComboBox([field.trueValue,field.falseValue],(field.value) ? 0 : 1);
                    if(field.control.toLowerCase()=="checkbox") return createCheckbox(field.value);
                }

                window.addAccessoryView(createControl());
                if(isUndefined(field.getter)){
                    field.getter = function(value) {
                        value=value.toLocaleString();
                        var trues=["yes","true","1",field.trueValue];
                        for(var i=0;i<trues.length;i++) {
                            if(value==trues[i]) {
                                return true;
                            }
                        }

                        return false;
                    };
                }
            }

            if(isDefined(field.type) && field.type==AlertFieldType.String)
            {
                window.addTextFieldWithValue(isDefined(field.value) ? field.value : "");

                if(field.placeholder) {
                    var fieldView=window.views().lastObject();
                    fieldView.setPlaceholderString(field.placeholder);
                }

                if(field.firstResponder) {
                    var view=window.views().lastObject();
                    // window.alert().window().setInitialFirstResponder(view);
                    window.alert().window().makeFirstResponder(view);
                }
            }

            field["$Index"]=index;
            index+=1;
        }

        for(var i=0;i<alert.buttons.length;i++) {
            var button=alert.buttons[i];
            window.addButtonWithTitle(button.title);
        }

        var response=window.runModal();

        // Post-process fields.
        var data = {};
        for(var key in alert.fields) {
            var field=alert.fields[key];

            var value=window.viewAtIndex(field["$Index"]).stringValue().UTF8String();
            if(field.type == AlertFieldType.Select) {
                var index=window.viewAtIndex(field["$Index"]).indexOfSelectedItem();
                data[key]=(isUndefined(field.getter)) ? value : field.getter(value,index);
            } else {
                data[key]=(isUndefined(field.getter)) ? value : field.getter(value);
            }
        }


        var inx=((parseInt(response)-1000));
        if(alert.buttons[inx].onClick) {
            alert.buttons[inx].onClick(data);
        }



    };

    root.UI = UI;




}).call(this);
