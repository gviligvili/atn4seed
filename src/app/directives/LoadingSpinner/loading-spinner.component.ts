/**
 * Created by talgvili on 18/06/2017.
 */
import {Component} from '@angular/core';

@Component({
  selector: 'loading-spinner',
  template: `
<div style="height: 100%; width: 100%; position: relative">
<div class='loading-spinner-overlay always-showing-loading-spinner-overlay'>
  <div class='loading-spinner-anim'>
    <div class='loading-spinner-border loading-spinner-out'></div>
    <div class='loading-spinner-border loading-spinner-in'></div>
    <div class='loading-spinner-border loading-spinner-mid'></div>
    <div class='circle'>
      <span class='loading-spinner-dot'></span>
      <span class='loading-spinner-dot'></span>
      <span class='loading-spinner-dot'></span>
      <span class='loading-spinner-dot'></span>
      <span class='loading-spinner-dot'></span>
      <span class='loading-spinner-dot'></span>
      <span class='loading-spinner-dot'></span>
      <span class='loading-spinner-dot'></span>
      <span class='loading-spinner-dot'></span>
      <span class='loading-spinner-dot'></span>
      <span class='loading-spinner-dot'></span>
      <span class='loading-spinner-dot'></span>
    </div>
  </div>
</div>
</div>
`,
  styles: [''] // The Styles are in the src/styles.css file ! , because we need themfbefore compilation !
})
export class LoadingSpinner {
  constructor() {
  }
}
