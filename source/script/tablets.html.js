const cmn = require('./$common.js');

const R = cmn.Header + `
        <div class="android-more-section">
          <div class="android-section-title mdl-typography--display-1-color-contrast">TABLETS</div>
          <div class="android-card-container mdl-grid">
            <div class="mdl-cell mdl-cell--3-col mdl-cell--4-col-tablet mdl-cell--4-col-phone mdl-card mdl-shadow--3dp">
              <div class="mdl-card__media">
                <img src="images/more-from-2.png">
              </div>
              <div class="mdl-card__title">
                 <h4 class="mdl-card__title-text">Get a clean customisable home screen</h4>
              </div>
              <div class="mdl-card__supporting-text">
                <span class="mdl-typography--font-light mdl-typography--subhead">
                  <object type="text/html" data="tablets/01.txt"></object>
                </span>
              </div>
              <div class="mdl-card__actions">
                 <a class="android-link mdl-button mdl-js-button mdl-typography--text-uppercase" href="">
                   Download now
                   <i class="material-icons">chevron_right</i>
                 </a>
              </div>
            </div>

            <div class="mdl-cell mdl-cell--3-col mdl-cell--4-col-tablet mdl-cell--4-col-phone mdl-card mdl-shadow--3dp">
              <div class="mdl-card__media">
                <img src="images/more-from-3.png">
              </div>
              <div class="mdl-card__title">
                <h4 class="mdl-card__title-text">
                  <object type="text/html" data="tablets/02a.txt"></object>
                </h4>
              </div>
              <div class="mdl-card__supporting-text">
                <span class="mdl-typography--font-light mdl-typography--subhead">
                  <object type="text/html" data="tablets/02b.txt"></object>
                </span>
              </div>
              <div class="mdl-card__actions">
                 <a class="android-link mdl-button mdl-js-button mdl-typography--text-uppercase" href="">
                   Find apps
                   <i class="material-icons">chevron_right</i>
                 </a>
              </div>
            </div>
          </div>
        </div>

` + cmn.Footer + cmn.Tail();

return R;

