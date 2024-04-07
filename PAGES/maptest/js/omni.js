const Omni = {
    defineOmniFunctions() {
        window.sendOmniEvent = tag => {
            let sender;
            if (tag) {
                try {
                    sender = window.s || s_gi('sssamsung4ru,sssamsung4mstglobal');
                    sender.linkTrackVars = 'eVar33,events';
                    sender.linkTrackEvents = 'event45';
                    sender.eVar33 = tag;
                    sender.events = 'event45';
                    return sender.tl(this, 'o', tag);
                } catch (err) {
                    console.error(err);
                }
            }
        };
        window.sendOmniEvent26 = tag => {
            let sender;
            if (tag) {
                try {
                    sender = window.s || s_gi('sssamsung4ru,sssamsung4mstglobal');
                    sender.linkTrackVars = 'eVar26,events';
                    sender.linkTrackEvents = 'event26';
                    sender.eVar33 = tag;
                    sender.events = 'event26';
                    return sender.tl(this, 'o', tag);
                } catch (err) {
                    console.error(err);
                }
            }
        };
    },
    addGlobalEvents() {
        $('.main__nav-link-01').on('click', () => {
            sendOmniEvent26('ru:samsung-care-plus:nav-samsung-care');
        });
        $('.main__nav-link-02').on('click', () => {
            sendOmniEvent26('ru:samsung-care-plus:nav-choose-program');
        });
        $('.main__nav-link-03').on('click', () => {
            sendOmniEvent26('ru:samsung-care-plus:nav-activate');
        });
        $('.simple__item-link-01').on('click', () => {
            sendOmniEvent('ru:samsung-care-plus:scroll-to-block-where');
        });
        $('.simple__item-link-02').on('click', () => {
            sendOmniEvent('ru:samsung-care-plus:scroll-to-block-status-02');
        });
        $('.simple__item-popup-01').on('click', () => {
            sendOmniEvent('ru:samsung-care-plus:popup-activation');
        });
        $('.simple__item-information-01').on('click', () => {
            sendOmniEvent('ru:samsung-care-plus:click-on-servicelocation');
        });
        $('.simple__item-information-02').on('click', () => {
            sendOmniEvent('ru:samsung-care-plus:click-on-repair-van');
        });
        $('.program__tab._01').on('click', () => {
            sendOmniEvent26('ru:samsung-care-plus:tab-phone');
        });
        $('.program__tab._02').on('click', () => {
            sendOmniEvent26('ru:samsung-care-plus:tab-tablet');
        });
        $('.program__tab._03').on('click', () => {
            sendOmniEvent26('ru:samsung-care-plus:tab-flip');
        });
        $('.program__tab._04').on('click', () => {
            sendOmniEvent26('ru:samsung-care-plus:tab-device');
        });
        $('.program__card-info-link').on('click', () => {
            sendOmniEvent('ru:samsung-care-plus:click-on-information-about-program');
        });
        $('.where__item-link').on('click', () => {
            sendOmniEvent('ru:samsung-care-plus:select-stores');
        });
        $('.where__item-text._01').on('click', () => {
            sendOmniEvent('ru:samsung-care-plus:information-about-screen');
        });
        $('.where__item-text._02').on('click', () => {
            sendOmniEvent('ru:samsung-care-plus:information-about-complex');
        });
        $('.where__item-text._03').on('click', () => {
            sendOmniEvent('ru:samsung-care-plus:information-about-warranty');
        });
        $('.status__item-btn-link').on('click', () => {
            sendOmniEvent('ru:samsung-care-plus:open-popup-activation');
        });
        $('.call__block-contact-link').on('click', () => {
            sendOmniEvent('ru:samsung-care-plus:phone-link-01');
        });
        $('.legal__text-link').on('click', () => {
            sendOmniEvent('ru:samsung-care-plus:phone-link-02');
        });
        $('#faq01').on('click', () => {
            sendOmniEvent('ru:samsung-care-plus:faq-link-01');
        });
        $('#faq02').on('click', () => {
            sendOmniEvent('ru:samsung-care-plus:faq-link-02');
        });
        $('#faq03').on('click', () => {
            sendOmniEvent('ru:samsung-care-plus:faq-link-03');
        });
        $('#faq04').on('click', () => {
            sendOmniEvent('ru:samsung-care-plus:faq-link-04');
        });
        $('#faq05').on('click', () => {
            sendOmniEvent('ru:samsung-care-plus:faq-link-05');
        });
        $('#faq06').on('click', () => {
            sendOmniEvent('ru:samsung-care-plus:faq-link-06');
        });
        $('#faq07').on('click', () => {
            sendOmniEvent('ru:samsung-care-plus:faq-link-07');
        });
        $('#faq08').on('click', () => {
            sendOmniEvent('ru:samsung-care-plus:faq-link-08');
        });
        $('#faq09').on('click', () => {
            sendOmniEvent('ru:samsung-care-plus:faq-link-09');
        });
        $('#faq10').on('click', () => {
            sendOmniEvent('ru:samsung-care-plus:faq-link-10');
        });
        $('#faq11').on('click', () => {
            sendOmniEvent('ru:samsung-care-plus:faq-link-11');
        });
        $('#faq12').on('click', () => {
            sendOmniEvent('ru:samsung-care-plus:faq-link-12');
        });
        $('#faq13').on('click', () => {
            sendOmniEvent('ru:samsung-care-plus:faq-link-13');
        });
        $('#faq14').on('click', () => {
            sendOmniEvent('ru:samsung-care-plus:faq-link-14');
        });
        $('#faq15').on('click', () => {
            sendOmniEvent('ru:samsung-care-plus:faq-link-15');
        });
        $('.popup__activation-form-btn').on('click', () => {
            sendOmniEvent('ru:samsung-care-plus:popup-activation-btn');
        });
        $('.popup__program-form-btn').on('click', () => {
            sendOmniEvent('ru:samsung-care-plus:popup-program-btn');
        });
        $('.status__item-btn').on('click', () => {
            sendOmniEvent('ru:samsung-care-plus:status-btn');
        });
    }
};
