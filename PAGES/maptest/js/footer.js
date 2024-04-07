window.addEventListener("load", (() => {
    function s() {
        var s;
        $(
            (function() {
                $(".scroll").length && $(document).on("click scroll.init", ".scroll", (function(s) {
                        s.preventDefault();
                        var a = $(this).attr("href") || $(this).data("href"),
                            e = $(a).offset().top;
                        $("html, body").animate({
                            scrollTop: e - 95
                        }, 1500)
                    }));
                    // ! function() {
                    //     let s = document.querySelectorAll(".where__item");
                    //     for (let a of s) {
                    //         a.querySelector(".where__item-check"), a.querySelector(".where__item-info")
                    //     }
                    // }(),
                    App.createIconsSwiper(n),
                    function() {
                        let s = $("#program"),
                            a = $("#status"),
                            e = $("#promo");
                        $(window).scroll((function() {
                            let n = $(window).scrollTop() + $(window).height(),
                                t = s.offset().top,
                                r = a.offset().top,
                                o = e.offset().top;
                            document.querySelector(".sticky-navigation-text__wrap"), document.querySelector(".main__nav");
                            n > o && ($(".main__nav-link").removeClass("active"), $("#care__nav-01").addClass("active")), n > t && ($(".main__nav-link").removeClass("active"), $("#care__nav-02").addClass("active")), n > r && ($(".main__nav-link").removeClass("active"), $("#care__nav-03").addClass("active"))
                        }))
                    }(),
                    function() {
                        function s() {
                            var s = !1;
                            $(".popup__program-form").find(".error").removeClass("active"), s = !(grecaptcha.getResponse() < 1);
                            return ((new Date).getTime() < new Date($("#buydate").val().replace(/(\d{2}).(\d{2}).(\d{4})/, "$2/$1/$3")).getTime() || $("#buydate").val().length < 1) && ($("#errorBuydate").addClass("active"), s = !1), $("#sertNumber").val() || ($("#errorSert").addClass("active"), s = !1), ($("#inputEmail").val() < 1 || !/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test($("#inputEmail").val())) && ($("#errorEmail").addClass("active"), s = !1), $("#programIMEI").val() < 1 && ($("#errorIMEI").addClass("active"), s = !1), s
                        }
                        $("#status-btn").click((function(s) {
                                if (s.preventDefault(), $("#status-btn").text("Проверить"), $(".status__item-form").find(".errorMessage").remove(), $("#imei-check").val() < 1) $(".errorPlace").html('<span class="errorMessage">' + $("#imei-check").data("error") + "</span>");
                                else {
                                    var a = {
                                        Number: $("#imei-check").val()
                                    };
                                    $.ajax({
                                        url: "https://ssl.samsung.ru/localCMS/Services/GetSmartCareStatus",
                                        type: "POST",
                                        dataType: "json",
                                        traditional: !0,
                                        data: a,
                                        success: function(s) {
                                            "ERROR" === s.Result || "OK" === s.Result && "К сожалению, регистрация с указанными Вами данными не найдена или в предоставленных данных содержится ошибка. Для получения дополнительной информации обратитесь в контактный центр по тел. 8-800-555-55-88 (Россия), 0-800-555-555 (Грузия)." === s.Message ? ($(".errorPlace").html('<span class="errorMessage">' + s.Message + "</span>"), $("#status-btn").text("Проверить").css({
                                                "background-color": "#000",
                                                color: "#fff",
                                                border: "2px solid #000"
                                            })) : $("#status-btn").text("Активна").css({
                                                "background-color": "#fff",
                                                color: "#0da321",
                                                border: "2px solid #0da321"
                                            })
                                        },
                                        error: function(s) {
                                            console.log(s)
                                        }
                                    })
                                }
                            })), $("#activation-btn").click((function(s) {
                                if (s.preventDefault(), $("#activation-btn").text("Проверить").css({
                                        "background-color": "#fff",
                                        color: "#4eb1dd",
                                        border: "2px solid #fff"
                                    }), $(".popup__activation").find(".errorMessage").remove(), $("#activation-input").val() < 1) $(".errorPlace").html('<span class="errorMessage">' + $("#activation-input").data("error") + "</span>");
                                else {
                                    var a = {
                                        Number: $("#activation-input").val()
                                    };
                                    $.ajax({
                                        url: "https://ssl.samsung.ru/localCMS/Services/GetSmartCareStatus",
                                        type: "POST",
                                        dataType: "json",
                                        traditional: !0,
                                        data: a,
                                        success: function(s) {
                                            console.log(s.Result), "ERROR" === s.Result ? ($(".errorPlace").html('<span class="errorMessage">' + s.Message + "</span>"), $("#activation-btn").text("Не активна").css({
                                                "background-color": "#fff",
                                                color: "#ff6347",
                                                border: "2px solid #ff6347"
                                            })) : "OK" === s.Result && "К сожалению, регистрация с указанными Вами данными не найдена или в предоставленных данных содержится ошибка. Для получения дополнительной информации обратитесь в контактный центр по тел. 8-800-555-55-88 (Россия), 0-800-555-555 (Грузия)." === s.Message ? ($("#status-btn").text("Проверить"), $(".errorPlace").html('<span class="errorMessage">' + s.Message + "</span>")) : $("#activation-btn").text("Активна").css({
                                                "background-color": "#fff",
                                                color: "rgb(13, 163, 33)",
                                                border: "2px solid rgb(13, 163, 33)"
                                            })
                                        },
                                        error: function(s) {
                                            console.log(s)
                                        }
                                    })
                                }
                            })), $("#program-btn").click((function(a) {
                                if (a.preventDefault(), !s()) return s(), !1;
                                {
                                    $("#program-btn").removeAttr("disabled");
                                    const s = "https://ssl.samsung.ru/localCMS/Warranty/Warranty_Insert";
                                    let a = {
                                        extWarrantyCertificate: $("#sertNumber").val(),
                                        serialImei: $("#programIMEI").val(),
                                        email: $("#inputEmail").val(),
                                        clientSaleDate: $("#buydate").val(),
                                        SubscribeEmail: !$("#subscribe").is("[disabled]")
                                    };
                                    $.ajax({
                                        url: s,
                                        type: "POST",
                                        dataType: "json",
                                        traditional: !0,
                                        data: a,
                                        success: function(s) {
                                            "ERROR" === s.Result || "OK" === s.Result && "К сожалению, регистрация с указанными Вами данными не найдена или в предоставленных данных содержится ошибка. Для получения дополнительной информации обратитесь в контактный центр по тел. 8-800-555-55-88 (Россия), 0-800-555-555 (Грузия)." === s.Message ? ($(".serverMsg").html('<span class="errorMessage">' + s.Message + "</span>"), $(".popup__program-form")[0].reset(), $("#program-btn").closest(".s-modal__content").addClass("hidden"), $("#program-btn").closest(".s-modal__block").find(".s-modal__content-result-error").removeClass("hidden"), $("#program-btn").closest(".s-modal__block").find(".popup__program-text-error").text(s.Message)) : ($("#program-btn").removeAttr("disabled").text("Активна").css({
                                                "background-color": "#fff",
                                                color: "#000",
                                                border: "2px solid #000"
                                            }), $("#program-btn").closest(".s-modal__block").find(".s-modal__content-result-error").addClass("hidden"), $("#program-btn").closest(".s-modal__content").addClass("hidden"), $("#program-btn").closest(".s-modal__block").find(".s-modal__content-result-positive").removeClass("hidden"))
                                        },
                                        error: function(s) {}
                                    })
                                }
                            })),
                            function() {
                                const s = document.querySelector(".js-input-program-number"),
                                    a = document.querySelector(".js-program-number-error-message");

                                function e(s) {
                                    s ? (a.innerText = "Введен некорректный символ", a.classList.add("active")) : (a.classList.remove("active"), a.innerText = "Введите номер программы, который находится под защитным слоем или в чеке. Первые три символа — буквы")
                                }
                                s.addEventListener("click", (s => {
                                    0 === s.target.value.length && (s.target.value = "RU")
                                })), s.addEventListener("input", (s => {
                                    const a = s.target,
                                        n = /^[a-zA-Z0-9]+$/gm,
                                        t = /^[a-zA-Z1-9]+$/gm,
                                        r = /^[a-zA-Z]+$/gm,
                                        o = /^[0-9]+$/gm;
                                    a.value = a.value.toUpperCase(), a.value.length < 2 && (a.value = "RU"), n.test(a.value) ? (e(!1), a.value.length > 2 && (t.test(a.value[2]) ? (e(!1), a.value.length > 3 && (o.test(a.value[2]) ? (o.lastIndex = 0, a.value.length < 10 ? o.test(a.value[a.value.length - 1]) ? e(!1) : (o.lastIndex = 0, a.value = a.value.slice(0, a.value.length - 1), e(!0)) : r.test(a.value[a.value.length - 1]) ? e(!1) : (r.lastIndex = 0, a.value = a.value.slice(0, a.value.length - 1), e(!0)), a.value.length > 10 && (a.value = a.value.slice(0, a.value.length - 1))) : r.test(a.value[2]) && (r.lastIndex = 0, t.lastIndex = 0, a.value[3] && !t.test(a.value[3]) ? (t.lastIndex = 0, a.value = a.value.slice(0, a.value.length - 1), e(!0)) : e(!1), a.value.length > 4 && (a.value.length < 11 ? o.test(a.value[a.value.length - 1]) ? e(!1) : (o.lastIndex = 0, a.value = a.value.slice(0, a.value.length - 1), e(!0)) : r.test(a.value[a.value.length - 1]) ? e(!1) : (r.lastIndex = 0, a.value = a.value.slice(0, a.value.length - 1), e(!0))), a.value.length > 11 && (a.value = a.value.slice(0, a.value.length - 1))))) : (t.lastIndex = 0, a.value = a.value.slice(0, a.value.length - 1), e(!0)))) : (n.lastIndex = 0, a.value = a.value.slice(0, a.value.length - 1), e(!0))
                                }))
                            }(),
                            function() {
                                const s = document.querySelector(".js-input-imei-number"),
                                    a = document.querySelector(".js-imei-number-error-message");
                                s.addEventListener("input", (s => {
                                    const e = s.target,
                                        n = /^[0-9]+$/gm;

                                    function t(s) {
                                        s ? (a.innerText = "Введен некорректный номер", a.classList.add("active")) : (a.classList.remove("active"), a.innerText = "Введите IMEI/Серийный номер")
                                    }
                                    n.test(e.value) ? (t(!1), e.value.length > 15 ? (e.value = e.value.slice(0, e.value.length - 1), t(!0)) : t(!1)) : (n.lastIndex = 0, e.value = e.value.slice(0, e.value.length - 1), t(!0))
                                }))
                            }(),
                            function() {
                                const s = document.querySelector(".js-input-email"),
                                    a = document.querySelector(".js-input-email-error-message");
                                s.addEventListener("blur", (s => {
                                    const e = s.target,
                                        n = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/gm;
                                    n.test(e.value) ? (a.classList.remove("active"), a.innerText = "Введите ваш e-mail") : (n.lastIndex = 0, a.innerText = "Введен корректный email", a.classList.add("active"))
                                })), s.addEventListener("focus", (() => {
                                    a.classList.remove("active"), a.innerText = "Введите ваш e-mail"
                                }))
                            }(), async function() {
                                    const s = document.querySelector(".js-input-date"),
                                        a = document.querySelector(".js-input-date-error-message"),
                                        e = Intl.DateTimeFormat().resolvedOptions().timeZone,
                                        n = await fetch(`https://worldtimeapi.org/api/timezone/${e}`).then((s => s.json())).then((s => s.datetime)),
                                        t = new Date(n);

                                    function r(s, e = "Введите верную дату покупки устройства") {
                                        s ? (a.innerText = e, a.classList.add("active")) : (a.classList.remove("active"), a.innerText = "Введите верную дату покупки устройства")
                                    }
                                    s.addEventListener("blur", (s => {
                                        const a = s.target;
                                        if (a.value.length) {
                                            let s = a.value.split(".");
                                            [s[0], s[1]] = [s[1], s[0]];
                                            const e = new Date(s.join("."));
                                            e instanceof Date && !isNaN(e) ? t - e > 31536e6 ? r(!0, `Дата должна быть после ${t.getDate()<10?"0"+t.getDate():t.getDate()}.${t.getMonth()+1<10?"0"+(t.getMonth()+1):t.getMonth()+1}.${t.getFullYear()-1}`) : e > t && r(!0) : r(!0)
                                        } else r(!0)
                                    })), s.addEventListener("focus", (() => r(!1)))
                                }(),
                                function() {
                                    const s = document.querySelector(".js-activation-form"),
                                        a = s.querySelector(".js-activation-form-popup-notification");
                                    s.addEventListener("click", (s => {
                                        const e = s.target;
                                        e.classList.contains("js-activation-form-icon") ? (s.preventDefault(), a.classList.toggle("hidden")) : e.classList.contains("js-activation-form-popup-notification") ? s.preventDefault() : a.classList.add("hidden")
                                    }))
                                }()
                    }(),
                    function() {
                        let s = $("#what"),
                            a = $("#promo"),
                            e = $("#advantage"),
                            n = $("#simple"),
                            t = $("#where"),
                            r = $("#status"),
                            o = $("#call");
                        $(window).scroll((function() {
                            $(window).scrollTop() > a.offset().top - a.height() / 2 - 300 && a.find(".animBlock").each((function(s) {
                                $(this).css({
                                    "transition-delay": "." + s + "s"
                                }), $(this).addClass("_show")
                            })), $(window).scrollTop() > s.offset().top - s.height() / 2 - 300 && s.find(".animBlock").each((function(s) {
                                $(this).css({
                                    "transition-delay": "." + s + "s"
                                }), $(this).addClass("_show")
                            })), $(window).scrollTop() > e.offset().top - e.height() / 2 - 300 && e.find(".animBlock").each((function(s) {
                                $(this).css({
                                    "transition-delay": "." + s + "s"
                                }), $(this).addClass("_show")
                            })), $(window).scrollTop() > n.offset().top - n.height() / 2 - 300 && n.find(".animationJs").each((function(s) {
                                $(this).css({
                                    "transition-delay": "." + s + "s"
                                }), $(this).addClass("_show")
                            })), $(window).scrollTop() > t.offset().top - t.height() / 2 - 300 && t.find(".animBlock").each((function(s) {
                                $(this).css({
                                    "transition-delay": "." + s + "s"
                                }), $(this).addClass("_show")
                            })), $(window).scrollTop() > r.offset().top - r.height() / 2 - 300 && r.find(".animBlock").each((function(s) {
                                $(this).css({
                                    "transition-delay": "." + s + "s"
                                }), $(this).addClass("_show")
                            })), $(window).scrollTop() > o.offset().top - o.height() / 2 - 300 && o.find(".animBlock").each((function(s) {
                                $(this).css({
                                    "transition-delay": "." + s + "s"
                                }), $(this).addClass("_show")
                            }))
                        }))
                    }();  
                    Omni.defineOmniFunctions();
                    Omni.addGlobalEvents();
                    setTimeout(void $(".program__tab._01").click(), 10), $("#buydate").mask("99.99.9999", {
                        placeholder: "дд.мм.гггг"
                    }), $("#buydate").on("focus, click", (function() {
                        "дд.мм.гггг" === $(this)[0].value && $(this)[0].setSelectionRange(0, 0)
                    })), $(".s-faq-toggle").on("click", (() => {
                        setTimeout((function() {
                            $(".where__item-check").toggleClass("active"), $(".where__item-info").toggleClass("active")
                        }), 2e3)
                    }))
            })); 
            s = "s-faq__item_open", $(".s-faq__list").on("click", ".s-faq__name", (function() {
                const a = $(this).closest(".s-faq__item"),
                    e = a.find(".s-faq__content");
                if (a.hasClass(s)) e.stop().slideUp(300), a.removeClass(s);
                else {
                    e.stop().slideDown(300), a.addClass(s);
                    let n = a.siblings("." + s);
                    n.find(".s-faq__content").stop().slideUp(300), n.removeClass(s)
                }
            }));
            ! function() {
                const s = $(".s-modal"),
                    a = function() {
                        s.find("._modal-open").stop().slideUp(300, (function() {
                            s.stop().fadeOut(200), $("body").removeAttr("style")
                        }))
                    };
                $("[data-modal]").on("click", (function(a) {
                    const e = $(this).attr("href");
                    return !!e && (s.stop().fadeIn(200, (function() {
                        s.css("display", "flex"), s.find(e).stop().slideDown(300).addClass("_modal-open"), $("body").css("overflow", "hidden")
                    })), !1)
                })), $("body").on("click keyup", (function(s) {
                    if ("hidden" === $(this).css("overflow")) {
                        if ("click" === s.type && $(s.target).hasClass("s-modal__close") || $(s.target).hasClass("s-modal")) return a(), !1;
                        "keyup" === s.type && "Escape" === s.key && a()
                    }
                }))
            }()
    }
    const a = Meta.devices;
    App.e = 0,
        n = !0;
        $(! function(scripts) {
            ! function e(n) {
                let t = document.createElement("script");
                t.src = scripts[n], document.head.append(t), t.onload = () => {
                    n === scripts.length - 1 ? s() : e(n + 1)
                }
            }(0)
        }(["https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js", "https://cdnjs.cloudflare.com/ajax/libs/jquery.maskedinput/1.4.1/jquery.maskedinput.min.js"]));
}));