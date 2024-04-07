'Galaxy A' === $('.program__filter.active').val('')[0].outerText
    ? ($('.swiper-wrapper').addClass('swiper-wrapper_a'), sendOmniEvent26('ru:samsung-care-plus:phone-a'))
    : 'Galaxy S' === $('.program__filter.active').val('')[0].outerText
    ? sendOmniEvent26('ru:samsung-care-plus:phone-s')
    : 'Galaxy M' === $('.program__filter.active').val('')[0].outerText
    ? ($('.swiper-wrapper').addClass('swiper-wrapper_m'), sendOmniEvent26('ru:samsung-care-plus:phone-m'))
    : 'Galaxy Tab S' === $('.program__filter.active').val('')[0].outerText
    ? sendOmniEvent26('ru:samsung-care-plus:tablet-s')
    : 'Galaxy Tab A' === $('.program__filter.active').val('')[0].outerText
    ? sendOmniEvent26('ru:samsung-care-plus:tablet-a')
    : ($('.swiper-wrapper').removeClass('swiper-wrapper_a'), $('.swiper-wrapper').removeClass('swiper-wrapper_m'));
