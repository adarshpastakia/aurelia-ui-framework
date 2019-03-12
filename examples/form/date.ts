/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */
import { getDay } from "date-fns";

export class DatePage {
  protected dateHtml = `<template>
  
</template>`;

  protected disableDays = date => getDay(date) === 0;
}
