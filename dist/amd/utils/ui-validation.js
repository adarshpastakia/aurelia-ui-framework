var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "aurelia-framework", "aurelia-validation", "../elements/inputs/ui-markdown", "./ui-utils", "lodash"], function (require, exports, aurelia_framework_1, aurelia_validation_1, ui_markdown_1, ui_utils_1, _) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function loadValidators() {
        var validator = ui_utils_1.UIUtils.lazy(aurelia_validation_1.Validator);
        aurelia_validation_1.ValidationRules
            .customRule('url', function (value, obj) { return value === null || value === undefined || value === '' || (/^((http[s]?|ftp):\/)?\/?([^:\/\s]+)((\/\w+)*\/)([\w\-\.]+[^#?\s]+)(.*)?(#[\w\-]+)?$/).test(value); }, '\${$displayName } is not a valid url.');
        aurelia_validation_1.ValidationRules
            .customRule('phone', function (value, obj) { return value === null || value === undefined || value === '' || PhoneLib.isValid(value); }, '\${$displayName } is not a valid phone number.');
        aurelia_validation_1.ValidationRules
            .customRule('number', function (value, obj, min, max) { return value === null || value === undefined || value === '' || (isNumber(value) && value >= (isEmpty(min) ? Number.MIN_VALUE : min) && value <= (isEmpty(max) ? Number.MAX_VALUE : max)); }, '\${$displayName} must be an number value between \${$config.min} and \${$config.max}.', function (min, max) { return ({ min: min, max: max }); });
        aurelia_validation_1.ValidationRules
            .customRule('decimal', function (value, obj, min, max) { return value === null || value === undefined || value === '' || (isDecimal(value) && value >= (isEmpty(min) ? Number.MIN_VALUE : min) && value <= (isEmpty(max) ? Number.MAX_VALUE : max)); }, '\${$displayName} must be a decimal value between \${$config.min} and \${$config.max}.', function (min, max) { return ({ min: min, max: max }); });
        aurelia_validation_1.ValidationRules
            .customRule('language', function (map, obj, langs) {
            if (langs === void 0) { langs = ''; }
            var promises = [];
            map.__errored__ = [];
            _.forEach(map, function (model, key) {
                if (model && key != '__errored__') {
                    promises.push(validator.validateObject(model)
                        .then(function (e) {
                        if (_.filter(e, ['valid', false]).length > 0) {
                            map.__errored__.push(key);
                            return true;
                        }
                        return false;
                    }));
                }
            });
            return Promise.all(promises).then(function (e) { return _.filter(e).length == 0; });
        }, 'Some language entries contain invalid values');
    }
    exports.loadValidators = loadValidators;
    var UIValidationRenderer = (function () {
        function UIValidationRenderer() {
        }
        UIValidationRenderer.prototype.render = function (instruction) {
            for (var _i = 0, _a = instruction.unrender; _i < _a.length; _i++) {
                var _b = _a[_i], result = _b.result, elements = _b.elements;
                for (var _c = 0, elements_1 = elements; _c < elements_1.length; _c++) {
                    var element = elements_1[_c];
                    this.remove(element, result);
                }
            }
            for (var _d = 0, _e = instruction.render; _d < _e.length; _d++) {
                var _f = _e[_d], result = _f.result, elements = _f.elements;
                for (var _g = 0, elements_2 = elements; _g < elements_2.length; _g++) {
                    var element = elements_2[_g];
                    this.add(element, result);
                }
            }
        };
        UIValidationRenderer.prototype.add = function (element, result) {
            if (result.valid) {
                return;
            }
            element.classList.add('ui-invalid');
            element.classList.remove('ui-valid');
            try {
                var vm = element.au.controller.viewModel;
                if (!vm.errors)
                    vm.errors = [];
                if (~vm.errors.indexOf(result))
                    return;
                if (element.au.controller.viewModel && element.au.controller.viewModel instanceof ui_markdown_1.UILanguage) {
                    var ms = result.message.split('|');
                    vm.errors.push(result);
                    vm.errored = result.object[result.propertyName].__errored__;
                }
                else
                    vm.errors.push(result);
            }
            catch (E) { }
        };
        UIValidationRenderer.prototype.remove = function (element, result) {
            element.classList.remove('ui-invalid');
            element.classList.add('ui-valid');
            try {
                var vm = element.au.controller.viewModel;
                var i = vm.errors.length;
                while (i--) {
                    var message = vm.errors[i];
                    if (message.id == result.id) {
                        vm.errors.splice(i, 1);
                        break;
                    }
                }
                if (vm.errors.length == 0) {
                    vm.errors = null;
                    vm.errored = [];
                    element.classList.remove('ui-invalid');
                    element.classList.add('ui-valid');
                }
            }
            catch (E) { }
        };
        UIValidationRenderer = __decorate([
            aurelia_framework_1.autoinject()
        ], UIValidationRenderer);
        return UIValidationRenderer;
    }());
    exports.UIValidationRenderer = UIValidationRenderer;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,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O29CQUMxQixFQUFFLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztvQkFDakIsRUFBRSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7b0JBQ2hCLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO29CQUN2QyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDcEMsQ0FBQztZQUNILENBQUM7WUFBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqQixDQUFDO1FBM0RVLG9CQUFvQjtZQURoQyw4QkFBVSxFQUFFO1dBQ0Esb0JBQW9CLENBNERoQztRQUFELDJCQUFDO0tBNURELEFBNERDLElBQUE7SUE1RFksb0RBQW9CIiwiZmlsZSI6InV0aWxzL3VpLXZhbGlkYXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL1xuLy8gQGRlc2NyaXB0aW9uIDpcbi8vIEBhdXRob3IgICAgICA6IEFkYXJzaCBQYXN0YWtpYVxuLy8gQGNvcHlyaWdodCAgIDogMjAxN1xuLy8gQGxpY2Vuc2UgICAgIDogTUlUXG5pbXBvcnQgeyBhdXRvaW5qZWN0LCBET00gfSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XG5pbXBvcnQgeyBWYWxpZGF0b3IsIFZhbGlkYXRpb25SdWxlcywgUmVuZGVySW5zdHJ1Y3Rpb24sIFZhbGlkYXRlUmVzdWx0IH0gZnJvbSBcImF1cmVsaWEtdmFsaWRhdGlvblwiO1xuaW1wb3J0IHsgVUlMYW5ndWFnZSB9IGZyb20gJy4uL2VsZW1lbnRzL2lucHV0cy91aS1tYXJrZG93bic7XG5pbXBvcnQgeyBVSVV0aWxzIH0gZnJvbSBcIi4vdWktdXRpbHNcIjtcbmltcG9ydCAqIGFzIF8gZnJvbSBcImxvZGFzaFwiO1xuXG5leHBvcnQgZnVuY3Rpb24gbG9hZFZhbGlkYXRvcnMoKSB7XG4gIC8vIFZhbGlkYXRpb24gUnVsZXNcbiAgbGV0IHZhbGlkYXRvciA9IFVJVXRpbHMubGF6eShWYWxpZGF0b3IpO1xuICBWYWxpZGF0aW9uUnVsZXNcbiAgICAuY3VzdG9tUnVsZSgndXJsJywgKHZhbHVlLCBvYmopID0+IHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09ICcnIHx8ICgvXigoaHR0cFtzXT98ZnRwKTpcXC8pP1xcLz8oW146XFwvXFxzXSspKChcXC9cXHcrKSpcXC8pKFtcXHdcXC1cXC5dK1teIz9cXHNdKykoLiopPygjW1xcd1xcLV0rKT8kLykudGVzdCh2YWx1ZSksICdcXCR7JGRpc3BsYXlOYW1lIH0gaXMgbm90IGEgdmFsaWQgdXJsLicpO1xuICBWYWxpZGF0aW9uUnVsZXNcbiAgICAuY3VzdG9tUnVsZSgncGhvbmUnLCAodmFsdWUsIG9iaikgPT4gdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gJycgfHwgUGhvbmVMaWIuaXNWYWxpZCh2YWx1ZSksICdcXCR7JGRpc3BsYXlOYW1lIH0gaXMgbm90IGEgdmFsaWQgcGhvbmUgbnVtYmVyLicpO1xuICBWYWxpZGF0aW9uUnVsZXNcbiAgICAuY3VzdG9tUnVsZSgnbnVtYmVyJywgKHZhbHVlLCBvYmosIG1pbiwgbWF4KSA9PiB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSAnJyB8fCAoaXNOdW1iZXIodmFsdWUpICYmIHZhbHVlID49IChpc0VtcHR5KG1pbikgPyBOdW1iZXIuTUlOX1ZBTFVFIDogbWluKSAmJiB2YWx1ZSA8PSAoaXNFbXB0eShtYXgpID8gTnVtYmVyLk1BWF9WQUxVRSA6IG1heCkpLFxuICAgICdcXCR7JGRpc3BsYXlOYW1lfSBtdXN0IGJlIGFuIG51bWJlciB2YWx1ZSBiZXR3ZWVuIFxcJHskY29uZmlnLm1pbn0gYW5kIFxcJHskY29uZmlnLm1heH0uJywgKG1pbiwgbWF4KSA9PiAoeyBtaW4sIG1heCB9KSk7XG4gIFZhbGlkYXRpb25SdWxlc1xuICAgIC5jdXN0b21SdWxlKCdkZWNpbWFsJywgKHZhbHVlLCBvYmosIG1pbiwgbWF4KSA9PiB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSAnJyB8fCAoaXNEZWNpbWFsKHZhbHVlKSAmJiB2YWx1ZSA+PSAoaXNFbXB0eShtaW4pID8gTnVtYmVyLk1JTl9WQUxVRSA6IG1pbikgJiYgdmFsdWUgPD0gKGlzRW1wdHkobWF4KSA/IE51bWJlci5NQVhfVkFMVUUgOiBtYXgpKSxcbiAgICAnXFwkeyRkaXNwbGF5TmFtZX0gbXVzdCBiZSBhIGRlY2ltYWwgdmFsdWUgYmV0d2VlbiBcXCR7JGNvbmZpZy5taW59IGFuZCBcXCR7JGNvbmZpZy5tYXh9LicsIChtaW4sIG1heCkgPT4gKHsgbWluLCBtYXggfSkpO1xuICBWYWxpZGF0aW9uUnVsZXNcbiAgICAuY3VzdG9tUnVsZSgnbGFuZ3VhZ2UnLCAobWFwLCBvYmosIGxhbmdzID0gJycpID0+IHtcbiAgICAgIGxldCBwcm9taXNlcyA9IFtdO1xuICAgICAgbWFwLl9fZXJyb3JlZF9fID0gW107XG4gICAgICBfLmZvckVhY2gobWFwLCAobW9kZWwsIGtleSkgPT4ge1xuICAgICAgICBpZiAobW9kZWwgJiYga2V5ICE9ICdfX2Vycm9yZWRfXycpIHtcbiAgICAgICAgICBwcm9taXNlcy5wdXNoKHZhbGlkYXRvci52YWxpZGF0ZU9iamVjdChtb2RlbClcbiAgICAgICAgICAgIC50aGVuKGUgPT4ge1xuICAgICAgICAgICAgICBpZiAoXy5maWx0ZXIoZSwgWyd2YWxpZCcsIGZhbHNlXSkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIG1hcC5fX2Vycm9yZWRfXy5wdXNoKGtleSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbihlID0+IF8uZmlsdGVyKGUpLmxlbmd0aCA9PSAwKTtcbiAgICB9LCAnU29tZSBsYW5ndWFnZSBlbnRyaWVzIGNvbnRhaW4gaW52YWxpZCB2YWx1ZXMnKTtcbn1cblxuQGF1dG9pbmplY3QoKVxuZXhwb3J0IGNsYXNzIFVJVmFsaWRhdGlvblJlbmRlcmVyIHtcbiAgcmVuZGVyKGluc3RydWN0aW9uOiBSZW5kZXJJbnN0cnVjdGlvbikge1xuICAgIGZvciAobGV0IHsgcmVzdWx0LCBlbGVtZW50cyB9IG9mIGluc3RydWN0aW9uLnVucmVuZGVyKSB7XG4gICAgICBmb3IgKGxldCBlbGVtZW50IG9mIGVsZW1lbnRzKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlKGVsZW1lbnQsIHJlc3VsdCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChsZXQgeyByZXN1bHQsIGVsZW1lbnRzIH0gb2YgaW5zdHJ1Y3Rpb24ucmVuZGVyKSB7XG4gICAgICBmb3IgKGxldCBlbGVtZW50IG9mIGVsZW1lbnRzKSB7XG4gICAgICAgIHRoaXMuYWRkKGVsZW1lbnQsIHJlc3VsdCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYWRkKGVsZW1lbnQ6IEVsZW1lbnQsIHJlc3VsdDogVmFsaWRhdGVSZXN1bHQpIHtcbiAgICBpZiAocmVzdWx0LnZhbGlkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgndWktaW52YWxpZCcpO1xuICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgndWktdmFsaWQnKTtcblxuICAgIHRyeSB7XG4gICAgICBsZXQgdm0gPSBlbGVtZW50LmF1LmNvbnRyb2xsZXIudmlld01vZGVsO1xuICAgICAgaWYgKCF2bS5lcnJvcnMpIHZtLmVycm9ycyA9IFtdO1xuXG4gICAgICBpZiAofnZtLmVycm9ycy5pbmRleE9mKHJlc3VsdCkpIHJldHVybjtcblxuICAgICAgaWYgKGVsZW1lbnQuYXUuY29udHJvbGxlci52aWV3TW9kZWwgJiYgZWxlbWVudC5hdS5jb250cm9sbGVyLnZpZXdNb2RlbCBpbnN0YW5jZW9mIFVJTGFuZ3VhZ2UpIHtcbiAgICAgICAgbGV0IG1zID0gcmVzdWx0Lm1lc3NhZ2Uuc3BsaXQoJ3wnKTtcbiAgICAgICAgdm0uZXJyb3JzLnB1c2gocmVzdWx0KTtcbiAgICAgICAgdm0uZXJyb3JlZCA9IHJlc3VsdC5vYmplY3RbcmVzdWx0LnByb3BlcnR5TmFtZV0uX19lcnJvcmVkX187XG4gICAgICB9XG4gICAgICBlbHNlXG4gICAgICAgIHZtLmVycm9ycy5wdXNoKHJlc3VsdCk7XG4gICAgfSBjYXRjaCAoRSkgeyB9XG4gIH1cblxuICByZW1vdmUoZWxlbWVudDogRWxlbWVudCwgcmVzdWx0OiBWYWxpZGF0ZVJlc3VsdCkge1xuICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgndWktaW52YWxpZCcpO1xuICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgndWktdmFsaWQnKTtcblxuICAgIHRyeSB7XG4gICAgICBsZXQgdm0gPSBlbGVtZW50LmF1LmNvbnRyb2xsZXIudmlld01vZGVsO1xuICAgICAgbGV0IGkgPSB2bS5lcnJvcnMubGVuZ3RoO1xuICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICBsZXQgbWVzc2FnZTogYW55ID0gdm0uZXJyb3JzW2ldO1xuICAgICAgICBpZiAobWVzc2FnZS5pZCA9PSByZXN1bHQuaWQpIHtcbiAgICAgICAgICB2bS5lcnJvcnMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAodm0uZXJyb3JzLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgIHZtLmVycm9ycyA9IG51bGw7XG4gICAgICAgIHZtLmVycm9yZWQgPSBbXTtcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCd1aS1pbnZhbGlkJyk7XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgndWktdmFsaWQnKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChFKSB7IH1cbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiJzcmMifQ==
