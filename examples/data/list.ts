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

  <!-- TODO -->

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
