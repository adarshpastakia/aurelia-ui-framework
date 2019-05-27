/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */
import { autoinject } from "aurelia-framework";
import { Countries, UINotificationService } from "aurelia-ui-framework";

@autoinject()
export class DatagridPage {
  protected datagridHtml = `<template>

  <ui-datagrid data-source.bind="dataset" ui-scroll>
    <ui-column data-id="iso2" locked="start" label="Country">
      <template>
        <ui-flag code="\${$value}"></ui-flag>
        <span click.trigger="notif($record)" ui-link
              ui-tooltip="value.bind:$record.fullname + ' Info'; position.bind:'right'">\${$record.name}</span>
      </template>
    </ui-column>
    <ui-column data-id="continent" resizeable sortable>Continent</ui-column>
    <ui-column data-id="capital" resizeable sortable>Capital</ui-column>
    <ui-column data-id="fullname" resizeable sortable width="400px" max-width="600px">Fullname</ui-column>
    <ui-column locked="end" width="80px" no-padding align="center">
      <template>
        <ui-button type="outline" ui-theme="info" icon="mdi mdi-information" size="sm"
                   click.trigger="notif($record)" ui-tooltip="Country Info"></ui-button>
      </template>
    </ui-column>
  </ui-datagrid>

</template>`;

  protected datagridAttrs = {
    title: "ui-datagrid",
    attrs: [],
    events: []
  };

  protected countries = [...Countries.list];

  constructor(private notificationService: UINotificationService) {
  }

  protected notif(record: KeyValue) {
    this.notificationService.toast({
      message: `<ui-row>
        <ui-flag size="lg" code="${record.iso2}" ui-margin="sm"></ui-flag>
        <ui-col size="fill">
        <p ui-font="md" ui-weight="medium">${record.name}</p>
        <p ui-color="muted">${record.fullname}</p>
        <p ui-font="sm" ui-weight="medium">${record.capital}</p>
        </ui-col>`,
      theme: "info"
    });
  }
}
