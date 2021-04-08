import { Component, h, Prop, EventEmitter, Event, State } from '@stencil/core';
import { ITimeline } from './tembici-timeline.interface';

@Component({
  tag: 'tembici-timeline',
  styleUrl: 'tembici-timeline.scss',
  shadow: true,
})
export class TembiciTimeline {
  @Prop() timeline: ITimeline[];
  @Prop() initialItem = 0;

  @Event() timelineItemClicked: EventEmitter<number>;

  @State() activeItem: number;

  timelineItemClick(id: number) {
    this.timelineItemClicked.emit(id);
    this.activeItem = id;
  }

  componentWillLoad() {
    console.log('---WILL LOAD---')
    
    this.activeItem = this.initialItem;
    console.log('this.activeItem', this.activeItem);

    console.log('---END WILL LOAD---')
  }

  componentWillRender() {
    console.log('---WILL RENDER---')
    console.log('this.timeline', this.timeline);
    console.log('this.activeItem', this.activeItem);
    console.log('---END WILL RENDER---')
  }

  render() {
    return (
      <ul class="timeline__root">
        {
          this.timeline.map((tl, index) => 
            <li onClick={() => this.timelineItemClick(tl.id)} class="timeline__item--root">
              <div class="timeline__separator--root">
                <span 
                  class={{
                    'timeline__dot timeline__dot--root': true,
                    'timeline__dot--active': this.activeItem === tl.id
                  }}
                >
                  <span class="timeline__dot--span">{ tl.id }</span>
                </span>

                {this.timeline.length == index-1 && (
                  <span class="timeline__connector--root"></span>
                )}
              </div>
              <div class="timeline__content--root">
                <span 
                  class={{
                    'timeline__content--span': true,
                    'timeline__content--span-active': this.activeItem === tl.id
                  }}>
                  { tl.title }
                </span>
              </div>
            </li>
          )
        }
      </ul>
    );
  }

}
