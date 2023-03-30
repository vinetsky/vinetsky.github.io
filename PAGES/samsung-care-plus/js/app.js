const App = {
    onIconClick(event, n) {
        const t = $(event.currentTarget);
        $('.program__icon').removeClass('active');
        t.addClass('active');
        $('.program__card').addClass('active');
        $('.program__card-help').addClass('active');
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
        const r = t.data('icon');
        const o = Meta.devices.find(s => s.icon === r);
        const c = o.images;
        const options = o.options;
        if (App.e === 0) {
            sendOmniEvent(`ru:samsung-care-plus:user-choose-${o.name}`);
            setTimeout(() => {
                App.e = 0;
            });
        }
        if (n && App.e > 0) {
            App.e++;
        }
        $('.program__card-options').empty();

        options.forEach(option => {
            const programTag = document.createElement('div');
            let e;
            switch (option.name) {
                case 'complex':
                    e = 'complex';
                    break;
                case 'screen':
                    e = 'screen-active';
                    break;
                case 'guarantee':
                    e = 'warranty';
                    break;
                default:
                    e = '';
            }
            programTag.className = `swiper-slide program__card-tab ${option.name} ${option.nameSht}`;
            programTag.setAttribute('data-omni-type', 'microsite');
            programTag.setAttribute('data-omni', `ru:s-care-plus:program-card:${e}`);
            programTag.innerHTML = `
                <p class="program__card-tab-text">Программа</p>
                <p class="program__card-tab-title">${option.text}</p>
                <a href="${option.link}" class="program__card-tab-link hidden" style="display:none">...</a>
                <a href="${option.buy}" class="program__card-tab-buy hidden" data-price="${option.price}" style="display:none">...</a>
                <div class="program__card-tab-info hidden" style="display: none;">${option.info}</div>
            `;
            $('.program__card-options').append(programTag);
        });
        if (
            ($('.program__card-options').children().eq(0).addClass('active'),
            $('.program__card').on('click', '.program__card-tab', s => {
                const a = $(s.currentTarget);
                a.siblings('.active').removeClass('active');
                a.addClass('active');
                switch (true) {
                    case a.hasClass('complex') && App.e === 0:
                        sendOmniEvent('ru:samsung-care-plus:click-on-tab-complex');
                        sendOmniEvent('ru:samsung-care-plus:user-program');
                        setTimeout(() => {
                            App.e = 0;
                        });
                        if (n) {
                            App.e++;
                        }
                        break;

                    case a.hasClass('screen') && App.e === 0:
                        sendOmniEvent('ru:samsung-care-plus:click-on-tab-screen');
                        sendOmniEvent('ru:samsung-care-plus:user-program');
                        setTimeout(() => {
                            App.e = 0;
                        });
                        if (n) {
                            App.e++;
                        }
                        break;

                    case a.hasClass('guarantee') && App.e === 0:
                        sendOmniEvent('ru:samsung-care-plus:click-on-tab-guarantee');
                        sendOmniEvent('ru:samsung-care-plus:user-program');
                        setTimeout(() => {
                            App.e = 0;
                        });
                        if (n) {
                            App.e++;
                        }
                        break;
                    default:
                }
                if (a.hasClass('guarantee')) {
                    $('.program__card-photo').removeClass('active');
                } else if ($('.program__card-photo').hasClass('active')) {
                    setTimeout(() => {
                        $('.program__card-photo').removeClass('active');
                    }, 100);
                    setTimeout(() => {
                        $('.program__card-photo').addClass('active');
                    }, 1000);
                } else {
                    $('.program__card-photo').addClass('active');
                }

                $('.program__card-info-title').html(a.find('.program__card-tab-title').html());
                $('.program__card-info-link').attr('href', a.find('.program__card-tab-link').attr('href'));
                $('.program__card-info-btn').attr('href', a.find('.program__card-tab-buy').attr('href'));

                if (a.hasClass('points')) {
                    $('.cost').html(a.find('.program__card-tab-buy').data('price'));
                } else {
                    $('.cost').text(
                        (function (s) {
                            return `${s.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')} ₽`;
                        })(a.find('.program__card-tab-buy').data('price'))
                    );
                }

                $('.program__card-info-terms').html(a.find('.program__card-tab-info').html());
            }),
            $('._01').hasClass('active'))
        ) {
            $('.program__icons').on('click', '.program__icon', e => {
                const relativeTabs = $(e.currentTarget).closest('.program__block').find('.program__card-options').find('.program__card-tab');
                relativeTabs[relativeTabs.length > 1 ? 1 : 0].click();
            });
            const actionsConfig = {
                slidesPerView: 1.45,
                spaceBetween: 10,
                centeredSlides: !1,
                loop: !1
            };
            let actionsSwiper = null;
            function actionsSizer() {
                if (window.matchMedia('(min-width: 768px)').matches && actionsSwiper !== null) {
                    actionsSwiper.destroy();
                    actionsSwiper = null;
                } else if (window.matchMedia('(max-width: 767px)').matches && actionsSwiper === null) {
                    actionsSwiper = new Swiper('.program__card-action-swiper', actionsConfig);
                    setTimeout(() => {
                        $('.program__card-tab').eq(0).width();
                    }, 1);
                }
            }

            actionsSizer();
            window.addEventListener('resize', actionsSizer);
            window.addEventListener('orientationchange', actionsSizer);
        } else if ($('._04').hasClass('active')) {
            $('.program__icons').on('click', '.program__icon', event => {
                const sender = $(event.currentTarget);
                if (a.hasClass('icon_watch4_u1')) {
                    sender.closest('.program__block').find('.program__card-options').find('.program__card-tab')[0].click();
                }
                if (sender.hasClass('icon_watch4classic_u1')) {
                    sender.closest('.program__block').find('.program__card-options').find('.program__card-tab')[0].click();
                }
                if (sender.hasClass('icon_watch4classic-42')) {
                    sender.closest('.program__block').find('.program__card-options').find('.program__card-tab')[0].click();
                }
                if (sender.hasClass('icon_watch4-44')) {
                    sender.closest('.program__block').find('.program__card-options').find('.program__card-tab')[0].click();
                }
                if (sender.hasClass('icon_watch5pro')) {
                    sender.closest('.program__block').find('.program__card-options').find('.program__card-tab')[0].click();
                }
                if (sender.hasClass('icon_watch5')) {
                    sender.closest('.program__block').find('.program__card-options').find('.program__card-tab')[0].click();
                }
                if (sender.hasClass('icon_watch5_44')) {
                    sender.closest('.program__block').find('.program__card-options').find('.program__card-tab')[0].click();
                }
            });
        } else {
            const config = {
                slidesPerView: 1,
                onlyExternal: !1,
                allowTouchMove: !1,
                centeredSlides: !0,
                loop: !1
            };
            let cardsSwiper = null;
            function sizer() {
                if (window.matchMedia('(min-width: 768px)').matches && cardsSwiper !== null) {
                    cardsSwiper.destroy();
                    cardsSwiper = null;
                } else if (window.matchMedia('(max-width: 767px)').matches && cardsSwiper === null) {
                    cardsSwiper = new Swiper('.program__card-action-swiper', config);
                    setTimeout(() => {
                        $('.program__card-options.active').css({
                            transform: 'translate3d(0px, 0px, 0px)',
                            'pointer-events': 'none'
                        });
                    }, 1);
                }
            }

            sizer();
            window.addEventListener('resize', sizer);
            window.addEventListener('orientationchange', sizer);
        }
        $('.program__card-photo').empty();
        Object.keys(c).forEach(part => {
            const [partName, ownerModel] = c[part].split('_');
            let localizedName;
            switch (o.category) {
                case 'phone':
                case 'flip':
                    localizedName = 'смартфона';
                    break;
                case 'tablet':
                    localizedName = 'планшета';
                    break;
                case 'watch':
                    localizedName = 'умных часов';
                    break;
                default:
                    localizedName = '';
            }
            const photoBlock = $('<div class="program__card-photo-block"></div>');
            switch (partName) {
                case 'back':
                    photoBlock.html(
                        `<div class="program__card-photo-${part}">
                            <img alt="Замена задней панели для ${localizedName} Galaxy ${ownerModel}" 
                                src="https://images.samsung.com/is/image/samsung/assets/ru/offer/samsung-care-plus/06062022/models/${c[part]}.png" class="" />
                        </div>`
                    );
                    break;
                case 'battery':
                    photoBlock.html(
                        `<div class="program__card-photo-${part}">
                            <img alt="Замена аккумулятора для ${localizedName} Galaxy ${ownerModel}" 
                                src="https://images.samsung.com/is/image/samsung/assets/ru/offer/samsung-care-plus/06062022/models/${c[part]}.png" class="" />
                        </div>`
                    );
                    break;
                case 'body':
                    photoBlock.html(
                        `<div class="program__card-photo-${part}">
                            <img alt="Дополнительный год гарантии для ${localizedName} Galaxy ${ownerModel}" 
                                src="https://images.samsung.com/is/image/samsung/assets/ru/offer/samsung-care-plus/06062022/models/${c[part]}.png" class="" />
                        </div>`
                    );
                    break;
                case 'screen':
                    photoBlock.html(
                        `<div class="program__card-photo-${part}">
                            <img alt="Замена экрана для ${localizedName} Galaxy ${ownerModel}" 
                                src="https://images.samsung.com/is/image/samsung/assets/ru/offer/samsung-care-plus/06062022/models/${c[part]}.png" class="" />
                        </div>`
                    );
                    break;
                default:
                    photoBlock.html(
                        `<div class="program__card-photo-${part}">
                            <img alt="Модель Galaxy ${ownerModel}" 
                                src="https://images.samsung.com/is/image/samsung/assets/ru/offer/samsung-care-plus/06062022/models/${c[part]}.png" class="" />
                        </div>`
                    );
            }

            $('.program__card.active').attr('data-card', `${r}`);
            $('.program__card-photo').attr('data-item', `${r}`);
            $('.program__card-photo').append(photoBlock);
        });
        $('.program__card-photo-block img').on('load', () => {
            $('.program__card-photo-block').removeClass('preload');
            $('.program__card-photo-block').addClass('preload');
        });
    },
    onPhoneChoose() {
        const filterValue = $('.program__filter.active')[0].outerText;
        switch (filterValue) {
            case 'Galaxy A':
                $('.swiper-wrapper').addClass('swiper-wrapper_center').removeClass('swiper-wrapper_start');
                sendOmniEvent26('ru:samsung-care-plus:phone-a');
                break;
            case 'Galaxy S':
                $('.swiper-wrapper').addClass('swiper-wrapper_center').removeClass('swiper-wrapper_start');
                sendOmniEvent26('ru:samsung-care-plus:phone-s');
                break;
            case 'Galaxy M':
                $('.swiper-wrapper').addClass('swiper-wrapper_center').removeClass('swiper-wrapper_start');
                sendOmniEvent26('ru:samsung-care-plus:phone-m');
                break;
            case 'Galaxy Tab S':
                $('.swiper-wrapper').addClass('swiper-wrapper_center').removeClass('swiper-wrapper_start');
                sendOmniEvent26('ru:samsung-care-plus:tablet-s');
                break;
            case 'Galaxy Tab A':
                $('.swiper-wrapper').addClass('swiper-wrapper_center').removeClass('swiper-wrapper_start');
                sendOmniEvent26('ru:samsung-care-plus:tablet-a');
                break;
            default:
                $('.swiper-wrapper').removeClass('swiper-wrapper_a');
                $('.swiper-wrapper').removeClass('swiper-wrapper_m');
                break;
        }
    },
    createIconsSwiper(n) {
        function sorterFunc(s, e) {
            $('.program__icons_block').html(`
            <div class="swiperWrap">
                <div class="iconsSwiper">
                    <div class="program__icons swiper-wrapper"></div>
                    <div class="program__icons-pagination"></div>
                </div>
            </div>
            `);
            const filteredDevices = Meta.devices.filter(device => device.category === s).filter(device => device.series === e);
            const sortedDevices = filteredDevices.sort((item1, item2) => (item1.id > item2.id ? 1 : -1));

            sortedDevices.forEach(device => {
                $('.program__icons').append(
                    $(`
                <div
                    class="swiper-slide program__icon ${device.icon}"
                    data-icon="${device.icon}"
                    data-omni-type="microsite"
                    data-omni="ru:s-care-plus:program:${device.category}:${device.series}:${device.icon}"
                >
                    <div class="program__icon-image">
                        <img src="https://images.samsung.com/is/image/samsung/assets/ru/offer/samsung-care-plus/06062022/models/${device.icon}.png" 
                            class="program__icon-pic" alt="${device.name}" />
                    </div>
                    <p class="program__icon-title">${device.shortname}</p>
                </div>`)
                );
            });

            new Swiper('.iconsSwiper', {
                slidesPerView: 'auto',
                spaceBetween: 12,
                centeredSlides: !1,
                loop: !1,
                breakpoints: {
                    320: {
                        spaceBetween: 20
                    },
                    476: {
                        spaceBetween: 20
                    },
                    769: {
                        spaceBetween: 5
                    }
                },
                pagination: {
                    el: '.program__icons-pagination',
                    clickable: !0
                }
            });
            App.onPhoneChoose();
            $('.program__icons').on('click', '.program__icon', event => App.onIconClick(event, n));

            App.iconClicks = 0;
            $('.program__icon').click(() => {
                App.iconClicks++;
                if (App.iconClicks >= 2) {
                    const cardOffset = $('.program__card').offset().top;
                    const navHeight = $('.main__nav').outerHeight() + 60;
                    $('html, body').animate(
                        {
                            scrollTop: cardOffset - navHeight
                        },
                        1e3
                    );
                }
            });
        }

        $('.program__tab').click(event, event => this.onTabClick($(event.currentTarget), sorterFunc));
    },
    onTabClick(clickTarget, sortFunc) {
        const a = document.querySelector('.program__block-top');
        document.querySelector('.program__icons');
        $('.program__tab').removeClass('active');
        clickTarget.addClass('active');
        $('.program__block').addClass('active');
        $('.program__card-photo').removeClass('active');

        switch (clickTarget.data('tab')) {
            case 'phone':
                /* Template */
                a.innerHTML = `
                <div class="program__filter _phone-s active" data-filter="s" data-omni-type="microsite" data-omni="ru:s-care-plus:program:phone:s">Galaxy S</div>
                <div class="program__filter _phone-z" data-filter="z" data-omni-type="microsite" data-omni="ru:s-care-plus:program:phone:z">Galaxy Z</div>
                <div class="program__filter _phone-a" data-filter="a" data-omni-type="microsite" data-omni="ru:s-care-plus:program:phone:a">Galaxy A</div>
                <div class="program__filter _phone-m" data-filter="m" data-omni-type="microsite" data-omni="ru:s-care-plus:program:phone:m">Galaxy M</div>
        `;
                $('.program__filter').click(function () {
                    $('.program__filter').removeClass('active');
                    $(this).addClass('active');
                    sortFunc('phone', $(this).data('filter'));

                    switch (true) {
                        case $(this).hasClass('_phone-s'):
                            $('.iconS24ultra').click();
                            $(this).closest('.program__block.active').find('.program__card-options.active').find('.program__card-tab')[1].click();
                            break;
                        case $(this).hasClass('_phone-z'):
                            $('.icon_zflip5').click();
                            $(this).closest('.program__block.active').find('.program__card-options.active').find('.program__card-tab')[0].click();
                            break;
                        case $(this).hasClass('_phone-a'):
                            $('.icon_a54').click();
                            $(this).closest('.program__block.active').find('.program__card-options.active').find('.program__card-tab')[1].click();
                            break;
                        case $(this).hasClass('_phone-m'):
                            $('.icon_m53-new-style').click();
                            $(this).closest('.program__block.active').find('.program__card-options.active').find('.program__card-tab')[1].click();
                            break;
                        default:
                    }
                });

                $('.program__filter.active').click();
                break;
            case 'tablet':
                /* Template */
                a.innerHTML = `
            <div class="program__filter _tablet-s active" data-filter="s" data-omni-type="microsite" data-omni="ru:s-care-plus:program:tablet:s">Galaxy Tab S</div>
            <div class="program__filter _tablet-a" data-filter="a" data-omni-type="microsite" data-omni="ru:s-care-plus:program:tablet:a">Galaxy Tab A</div>
        `;
                $('.program__filter').click(function () {
                    $('.program__filter').removeClass('active');
                    $(this).addClass('active');
                    sortFunc('tablet', $(this).data('filter'));
                    $('.icon_s9_ultra').click();
                    $('.program__card').find('.program__card-tab')[0].click();
                    $('._tablet-a').click(() => {
                        $('.icon_a8').click();
                    });
                });
                $('.program__filter.active').click();
                break;
            case 'flip':
                /* Template */
                a.innerHTML = `<div class="program__filter active" data-filter="z">
                Galaxy Z
                 </div>`;
                $('.program__filter').click(function () {
                    $('.program__filter').removeClass('active');
                    $(this).addClass('active');
                    sortFunc('flip', $(this).data('filter'));
                    $('.icon_zflip5').click();
                    $('.program__card').find('.program__card-tab')[0].click();
                });
                $('.program__filter.active').click();
                break;
            default:
                a.innerHTML = `
                <div class="program__filter active" data-filter="w" data-omni-type="microsite" data-omni="ru:s-care-plus:program:device:w">
                    Galaxy Watch
                </div>
            `;
                $('.program__filter').click(function () {
                    $('.program__filter').removeClass('active');
                    $(this).addClass('active');
                    sortFunc('watch', $(this).data('filter'));
                    $('.icon_watch4-44').click();
                    $('.program__card').find('.program__card-tab')[0].click();
                });
                $('.program__filter.active').click();
        }
    }
};
