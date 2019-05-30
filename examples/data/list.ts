/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */
import { autoinject } from "aurelia-framework";
import { UINotificationService } from "aurelia-ui-framework";

@autoinject()
export class DatalistPage {
  protected actions = [
    { icon: "mdi mdi-pencil", label: "Edit" },
    { icon: "mdi mdi-delete", iconColor: "red", label: "Delete" },
    "-",
    { icon: "mdi mdi-settings", iconColor: "gray", label: "Settings" }
  ];

  protected ds = [{
    title: "Speak to Me/Breathe",
    album: "Dark Side of the Moon",
    artist: "Pink Floyd",
    duration: 3.15,
    genre: "Psychedelic Rock",
    year: 1972,
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/Dark_Side_of_the_Moon.png/220px-Dark_Side_of_the_Moon.png",
    members: "David Gilmour, Nick Mason, Roger Waters, Richard Wright"
  }, {
    title: "On the Run",
    album: "Dark Side of the Moon",
    artist: "Pink Floyd",
    duration: 3.15,
    genre: "Psychedelic Rock",
    year: 1972,
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/Dark_Side_of_the_Moon.png/220px-Dark_Side_of_the_Moon.png",
    members: "David Gilmour, Nick Mason, Roger Waters, Richard Wright"
  }, {
    title: "Time/Breathe Reprise",
    album: "Dark Side of the Moon",
    artist: "Pink Floyd",
    duration: 3.15,
    genre: "Psychedelic Rock",
    year: 1972,
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/Dark_Side_of_the_Moon.png/220px-Dark_Side_of_the_Moon.png",
    members: "David Gilmour, Nick Mason, Roger Waters, Richard Wright"
  }, {
    title: "Great Gig in the Sky",
    album: "Dark Side of the Moon",
    artist: "Pink Floyd",
    duration: 3.15,
    genre: "Psychedelic Rock",
    year: 1972,
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/Dark_Side_of_the_Moon.png/220px-Dark_Side_of_the_Moon.png",
    members: "David Gilmour, Nick Mason, Roger Waters, Richard Wright"
  }, {
    title: "Money",
    album: "Dark Side of the Moon",
    artist: "Pink Floyd",
    duration: 3.15,
    genre: "Psychedelic Rock",
    year: 1972,
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/Dark_Side_of_the_Moon.png/220px-Dark_Side_of_the_Moon.png",
    members: "David Gilmour, Nick Mason, Roger Waters, Richard Wright"
  }, {
    title: "Any Colour You Like",
    album: "Dark Side of the Moon",
    artist: "Pink Floyd",
    duration: 3.15,
    genre: "Psychedelic Rock",
    year: 1972,
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/Dark_Side_of_the_Moon.png/220px-Dark_Side_of_the_Moon.png",
    members: "David Gilmour, Nick Mason, Roger Waters, Richard Wright"
  }, {
    title: "Brain Damage",
    album: "Dark Side of the Moon",
    artist: "Pink Floyd",
    duration: 3.15,
    genre: "Psychedelic Rock",
    year: 1972,
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/Dark_Side_of_the_Moon.png/220px-Dark_Side_of_the_Moon.png",
    members: "David Gilmour, Nick Mason, Roger Waters, Richard Wright"
  }, {
    title: "Eclipse",
    album: "Dark Side of the Moon",
    artist: "Pink Floyd",
    duration: 3.15,
    genre: "Psychedelic Rock",
    year: 1972,
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/Dark_Side_of_the_Moon.png/220px-Dark_Side_of_the_Moon.png",
    members: "David Gilmour, Nick Mason, Roger Waters, Richard Wright"
  }];

  protected datalistHtml = `<template>

  <ui-data-list data-source.bind="ds" vertical>
  
    <template>
      <ui-data-card actions.bind="actions" click.trigger="notif($record)">
        <ui-avatar ui-bg="gray-dark" ui-color="white" icon="mdi mdi-music" round></ui-avatar>
        <ui-card-title>\${$record.title}</ui-card-title>
        <ui-card-meta>
          <span>\${$record.album}</span>
          <span ui-font="md">\${$record.artist}</span>
        </ui-card-meta>
        <ui-data-table>
          <data label="Duration">\${$record.duration}</data>
          <data label="Year">\${$record.year}</data>
          <data label="Genre">\${$record.genre}</data>
        </ui-data-table>
        <ui-button-group type="tool" slot="card-actions">
          <ui-button ui-theme="success" icon="mdi mdi-play"></ui-button>
          <ui-button ui-theme="info" icon="mdi mdi-pause"></ui-button>
        </ui-button-group>
        <ui-card-content>
          <ui-content ui-padding>
            <lipsum-para></lipsum-para>
          </ui-content>
        </ui-card-content>
      </ui-data-card>
  
    </template>
  
  </ui-data-list>
  
</template>`;

  protected datalistAttrs = {
    title: "ui-datalist",
    attrs: [],
    events: []
  };


  constructor(private notificationService: UINotificationService) {
  }

  protected notif(record: KeyValue) {
    this.notificationService.toast({
      message: `<ui-row>
        <ui-icon round size="xl" ui-margin="sm"><img src="${record.image}"/></ui-icon>
        <ui-col size="fill">
        <p ui-font="md" ui-weight="medium">${record.title}</p>
        <p ui-color="muted">${record.album}</p>
        <p ui-font="sm" ui-weight="medium">${record.artist}</p>
        </ui-col>`,
      theme: "info"
    });
  }
}
