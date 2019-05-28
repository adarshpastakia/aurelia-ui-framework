/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */
import { autoinject } from "aurelia-framework";
import { PLATFORM } from "aurelia-pal";
import { Countries, UINotificationService } from "aurelia-ui-framework";


@autoinject()
export class Tester {
  protected ds = [{
    title: "Speak to Me/Breathe",
    album: "Dark Side of the Moon",
    artist: "Pink Floyd",
    duration: 3.15,
    genre: "Psychedelic Rock",
    year: 1972,
    members: "David Gilmour, Nick Mason, Roger Waters, Richard Wright"
  }, {
    title: "On the Run",
    album: "Dark Side of the Moon",
    artist: "Pink Floyd",
    duration: 3.15,
    genre: "Psychedelic Rock",
    year: 1972,
    members: "David Gilmour, Nick Mason, Roger Waters, Richard Wright"
  }, {
    title: "Time/Breathe Reprise",
    album: "Dark Side of the Moon",
    artist: "Pink Floyd",
    duration: 3.15,
    genre: "Psychedelic Rock",
    year: 1972,
    members: "David Gilmour, Nick Mason, Roger Waters, Richard Wright"
  }, {
    title: "Great Gig in the Sky",
    album: "Dark Side of the Moon",
    artist: "Pink Floyd",
    duration: 3.15,
    genre: "Psychedelic Rock",
    year: 1972,
    members: "David Gilmour, Nick Mason, Roger Waters, Richard Wright"
  }, {
    title: "Money",
    album: "Dark Side of the Moon",
    artist: "Pink Floyd",
    duration: 3.15,
    genre: "Psychedelic Rock",
    year: 1972,
    members: "David Gilmour, Nick Mason, Roger Waters, Richard Wright"
  }, {
    title: "Any Colour You Like",
    album: "Dark Side of the Moon",
    artist: "Pink Floyd",
    duration: 3.15,
    genre: "Psychedelic Rock",
    year: 1972,
    members: "David Gilmour, Nick Mason, Roger Waters, Richard Wright"
  }, {
    title: "Brain Damage",
    album: "Dark Side of the Moon",
    artist: "Pink Floyd",
    duration: 3.15,
    genre: "Psychedelic Rock",
    year: 1972,
    members: "David Gilmour, Nick Mason, Roger Waters, Richard Wright"
  }, {
    title: "Eclipse",
    album: "Dark Side of the Moon",
    artist: "Pink Floyd",
    duration: 3.15,
    genre: "Psychedelic Rock",
    year: 1972,
    members: "David Gilmour, Nick Mason, Roger Waters, Richard Wright"
  }];

  constructor(private notificationService: UINotificationService) {
  }

  public notif(record: KeyValue) {
    this.notificationService.toast({
      message: `Clicked: <ui-flag code="${record.iso2}"></ui-flag> ${record.name}`,
      theme: "info"
    });
  }

}
