import 'aurelia-polyfills';
import { initialize } from 'aurelia-pal-browser';
import { setLevel, addAppender, Appender } from 'aurelia-logging';
import { ConsoleAppender } from "aurelia-logging-console";
setLevel(4);
addAppender(new ConsoleAppender());
initialize();
