/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

export class MenuPage {
  protected actionItems = [
    {
      group: "Group",
      items: [
        { label: "Menu Item", icon: "mdi mdi-music" },
        { label: "Menu Item", icon: "mdi mdi-music" }
      ]
    },
    { label: "Menu Item", icon: "mdi mdi-music", badge: "0", badgeTheme: "danger", disabled: true },
    { label: "Menu Item", icon: "mdi mdi-music", disabled: () => true },
    "-",
    {
      label: "Menu Item Dynamic",
      icon: "mdi mdi-music",
      items: () => new Promise(resolve => {
        setTimeout(() => resolve([
          { label: "Menu Item", icon: "mdi mdi-music" },
          { label: "Menu Item", icon: "mdi mdi-music" },
          { label: "Menu Item", icon: "mdi mdi-music" }
        ]), 2000);
      })
    }
  ];

  protected menuHtml = `<template>

  <ui-menu></ui-menu>

</template>`;

  protected menuItemAttrs = {
    title: "ui-menu-item",
    attrs: [
      {
        name: "id",
        values: "string",
        description: "Menu id"
      },
      {
        name: "icon",
        values: "string",
        description: "Icon font class"
      },
      {
        name: "label",
        values: "string",
        description: "Menu label"
      },
      {
        name: "href",
        values: "string",
        description: "Menu href"
      },
      {
        name: "active",
        values: "boolean",
        description: "Active hilight"
      }
    ],
    events: [
      {
        name: "click",
        params: "id",
        description: "Menu item click"
      },
      {
        name: "open",
        params: "null",
        description: "Menu item dropdown on open"
      },
      {
        name: "close",
        params: "null",
        description: "Menu item dropdown on close"
      },
      {
        name: "beforeopen",
        params: "null",
        description:
          "Menu item dropdown before open, return false to prevent open. To return a promise use <code>.call</code> instead of <code>.trigger</code>"
      },
      {
        name: "beforeclose",
        params: "null",
        description:
          "Menu item dropdown before close, return false to prevent close. To return a promise use <code>.call</code> instead of <code>.trigger</code>"
      }
    ]
  };
}
