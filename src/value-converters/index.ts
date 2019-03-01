import * as ObjectConverters from "./ui-object";
import * as TextConverters from "./ui-text";

export const ValueConverters = [
  ObjectConverters.FilterValueConverter,
  ObjectConverters.GroupValueConverter,
  ObjectConverters.ObjectMapValueConverter,
  ObjectConverters.SliceValueConverter,
  ObjectConverters.SortValueConverter,
  ObjectConverters.SplitValueConverter,
  TextConverters.AgeValueConverter,
  TextConverters.CurrencyValueConverter,
  TextConverters.DateValueConverter,
  TextConverters.DatetimeValueConverter,
  TextConverters.FromNowValueConverter,
  TextConverters.JsonValueConverter,
  TextConverters.MarkdownValueConverter,
  TextConverters.NumberValueConverter,
  TextConverters.PercentValueConverter,
  TextConverters.PhoneHtmlValueConverter,
  TextConverters.PhoneLocalHtmlValueConverter,
  TextConverters.PhoneValueConverter,
  TextConverters.TimeValueConverter,
  TextConverters.UtcValueConverter
];
