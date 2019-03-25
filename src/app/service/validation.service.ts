export class ValidationService {
    static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
        let config = {
            'required': 'Campo requerido',
            'invalidCreditCard': 'Is invalid credit card number',
            'invalidEmailAddress': 'Invalid email address',
            'invalidPassword': 'Invalid password. Password must be at least 6 characters long, and contain a number.',
            'minlength': `Tamaño minimo ${validatorValue.requiredLength}`,
            'validateDecimal12_2': 'Por favor Introduzca un numero correcto , formato xxxxxxxxxx.xx',
            'validateDecimal5_2': 'Por favor Introduzca un numero correcto , formato xxxxx.xx',
            'validateFieldParam': 'El valor no es correcto',
            'invalidYear': 'Año invalido',
        };
        //console.log(config);
        return config[validatorName];
    }

    /*static creditCardValidator(control) {
        // Visa, MasterCard, American Express, Diners Club, Discover, JCB
        if (control.value.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/)) {
            return null;
        } else {
            return { 'invalidCreditCard': true };
        }
    }/**/

    static emailValidator(control) {
        // RFC 2822 compliant regex
        if (control.value != undefined && control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            return null;
        } else {
            return { 'invalidEmailAddress': true };
        }
    }

    static validateDecimal12_2(control) {
        if (control.value != null && control.value != undefined) {
            //if (String(control.value).match(/^\d*\.?\d+$/)) {
            if (String(control.value).match(/^(?!\.?$)\d{0,12}(\.\d{0,2})?$/)) {
                //if (control.value.match(/^(?:0|[1-9][0-9]*)\.[0-9]+$/)) {
                return null;
            } else {
                return { 'validateDecimal12_2': true };
            }
        }
        return null;
    }

    static validateDecimal5_2(control) {
        if (control.value != null && control.value != undefined) {
            //if (String(control.value).match(/^\d*\.?\d+$/)) {
            if (String(control.value).match(/^(?!\.?$)\d{0,5}(\.\d{0,2})?$/)) {
                //if (control.value.match(/^(?:0|[1-9][0-9]*)\.[0-9]+$/)) {
                return null;
            } else {
                return { 'validateDecimal5_2': true };
            }
        }
        return null;
    }

    static fieldParamValidator(control) {
        //console.log('field param validator-->',control);
        if (control.value != undefined && control.value != null && (control.value.cod != undefined || control.value == ""
            && control.value.des)) {
            return null;
        } else if (control.value == undefined || control.value == null) {
            return null;
        } else {
            return { 'validateFieldParam': true };
        }
    }
    
    /*
        static passwordValidator(control) {
            // {6,100}           - Assert password is between 6 and 100 characters
            // (?=.*[0-9])       - Assert a string has at least one number
            if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
                return null;
            } else {
                return { 'invalidPassword': true };
            }
        }*/
}