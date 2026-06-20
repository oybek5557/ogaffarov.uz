(function(){
  "use strict";

  var dict = {
    ru: {
      "nav.home": "Главная",
      "nav.about": "Обо мне",
      "nav.skills": "Навыки",
      "nav.experience": "Опыт",
      "nav.services": "Услуги",
      "nav.contact": "Контакты",

      "hero.eyebrow": "Добро пожаловать в моё портфолио",
      "hero.h1": "Привет, я <span class=\"highlight\">Ойбек Гаффаров</span>",
      "hero.lead": "Я проектирую, защищаю и поддерживаю ИТ-инфраструктуру современного бизнеса — от сетей, серверов и идентификации до безопасности конечных точек и ERP. 10+ лет превращаю сложную инфраструктуру в надёжные, документированные системы.",
      "hero.btn.contact": "Связаться",
      "hero.btn.experience": "Посмотреть опыт",
      "hero.badge": "Открыт новым идеям",

      "about.eyebrow": "Обо мне",
      "about.h2": "Немного о моём пути",
      "about.lead": "Старший ИТ-специалист и системный администратор с опытом 10+ лет в сетях, инфраструктуре, идентификации, безопасности конечных точек и ERP — в Малайзии и Узбекистане.",
      "about.p1": "Я Ойбек Гаффаров. Моя карьера началась с практической поддержки сетей и хелпдеска в Куала-Лумпуре и переросла в старшие ИТ-роли, охватывающие весь стек — Windows Server и Active Directory, Microsoft 365, управление идентификацией и доступом, безопасность конечных точек (MDM/UEM), межсетевые экраны и VPN, IP-телефонию и инфраструктуру 1С:Предприятие/ERP.",
      "about.p2": "Сегодня я поддерживаю удалённую, ориентированную на безопасность команду с моделью нулевого доверия, автоматическим резервным копированием и жёсткими SLA — всё документировано и надёжно. Я технологический энтузиаст, который верит, что любопытство — главное преимущество.",
      "about.fact1": "10+ лет в ИТ",
      "about.fact2": "Самарканд, Узбекистан · Удалённо",
      "about.fact4": "Английский · Русский · Узбекский",
      "about.edu.title": "Образование",
      "about.edu.body": "Бакалавр, Бизнес-информационные системы (BIS) — Технологический университет Азии и Тихого океана (APU), Куала-Лумпур, Малайзия (2012 – 2016)",

      "skills.eyebrow": "В чём я силён",
      "skills.h2": "Навыки и экспертиза",
      "skills.lead": "Десятилетие практической работы с инфраструктурой, идентификацией, безопасностью и корпоративными системами.",
      "skill.network": "Сети и инфраструктура",
      "skill.winserver": "Windows Server / Active Directory",
      "skill.iam": "Идентификация и доступ (JumpCloud, M365)",
      "skill.endpoint": "Безопасность конечных точек и MDM/UEM",
      "skill.firewalls": "Межсетевые экраны и VPN (Zyxel, Forti, Pritunl)",
      "skill.erp": "Администрирование 1С:Предприятие / ERP",

      "exp.eyebrow": "Мой опыт",
      "exp.h2": "Опыт и образование",
      "exp.lead": "Хронология того, где я работал и учился.",
      "exp.tab.experience": "Опыт",
      "exp.tab.education": "Образование",

      "exp.t1.period": "Май 2024 – по настоящее время",
      "exp.t1.title": "Дежурная ИТ-поддержка",
      "exp.t1.company": "ogaffarov.uz · Частичная занятость · Удалённо",
      "exp.t1.desc": "Удалённые ИТ-операции в области идентификации, безопасности конечных точек и сетей с нулевым доверием для распределённой команды.",
      "exp.t1.li1": "Администрирую <strong>JumpCloud</strong> для централизованного каталога, SSO и управления жизненным циклом пользователей.",
      "exp.t1.li2": "Управляю <strong>Google Workspace</strong> — предоставление доступа, групповые политики и безопасность Drive.",
      "exp.t1.li3": "Контроль соответствия устройств и обновлений через <strong>ManageEngine Endpoint Central</strong> на смешанном парке macOS/Windows.",
      "exp.t1.li4": "Безопасный удалённый доступ через <strong>FortiClient ZTNA</strong> и <strong>Pritunl VPN</strong>; поддержка уровня 2/3 через <strong>Jira</strong> с SLA и анализом причин.",

      "exp.t2.period": "Авг 2020 – по настоящее время",
      "exp.t2.title": "Старший специалист по информационным технологиям",
      "exp.t2.company": "Nishon Baht · Полная занятость · Самарканд, Узбекистан",
      "exp.t2.desc": "Полностью отвечаю за ИТ-стек — сети, серверы, безопасность и промышленные системы — для производственного бизнеса.",
      "exp.t2.li1": "Перепроектировал офисную сеть; внедрил <strong>межсетевые экраны Zyxel</strong>, управляемые коммутаторы, двойной WAN и SSL/IPsec VPN.",
      "exp.t2.li2": "Развернул <strong>Windows Server</strong> (AD, DNS), администрировал <strong>Microsoft 365</strong> и автоматизировал резервное копирование NAS.",
      "exp.t2.li3": "Администрировал <strong>1С:Предприятие</strong> и подготовил инфраструктуру для нового внедрения ERP.",
      "exp.t2.li4": "Развернул промышленные ПК, интегрировал сканеры штрих-кодов и весовые терминалы, управлял <strong>Yeastar IP PBX</strong> и видеонаблюдением.",

      "exp.t3.period": "Март 2020 – Июль 2020",
      "exp.t3.title": "Технический специалист",
      "exp.t3.company": "Westminster International University · Ташкент, Узбекистан",
      "exp.t3.desc": "ИТ-операции и поддержка сетевой коммутации в университетской среде.",

      "exp.t4.period": "Окт 2019 – Март 2020",
      "exp.t4.title": "Инженер RAN",
      "exp.t4.company": "ZTE Investment · Ташкент, Узбекистан",
      "exp.t4.desc": "Настройка и ввод в эксплуатацию новых базовых станций 2G/3G (BBU/RRU).",

      "exp.t5.period": "Ноя 2017 – Окт 2019",
      "exp.t5.title": "ИТ-поддержка сети, уровень 1",
      "exp.t5.li1": "Настраивал коммутаторы и беспроводные устройства <strong>Cisco</strong> и <strong>Ruckus</strong>; общее обслуживание сети и поддержка L1.",
      "exp.t5.li2": "Устанавливал CCTV/NVR и контроль доступа ZKTeco; подключал базы данных MS SQL к приложениям.",
      "exp.t5.li3": "Участник проекта по созданию <strong>Cisco Academy</strong>.",

      "exp.t6.period": "Сен 2014 – Ноя 2017",
      "exp.t6.title": "Технический ассистент",
      "exp.t6.li1": "Настройка оборудования и ПО в лабораториях; обработка обращений хелпдеска и распределение задач.",
      "exp.t6.li2": "Устранял неполадки ПК и сети; прокладка кабелей LAN и установка точек доступа.",
      "exp.t6.li3": "Контроль качества в аудиториях, актовых залах и компьютерных лабораториях.",

      "edu.t1.title": "Бакалавр — Бизнес-информационные системы (BIS)",
      "edu.t1.company": "Технологический университет Азии и Тихого океана (APU) · Куала-Лумпур",
      "edu.t2.period": "Сертификат",
      "edu.t2.title": "Введение в R",
      "edu.t3.period": "Июн 2016",
      "edu.t3.title": "Сертификат участия",

      "services.eyebrow": "Предложения",
      "services.h2": "Как я могу помочь",
      "services.lead": "Комплексные ИТ-услуги — от сетей и серверов до идентификации, безопасности и автоматизации.",

      "svc.network.title": "Сети и инфраструктура",
      "svc.network.body": "Проектирую и обслуживаю офисные сети — межсетевые экраны, управляемые коммутаторы, двойной WAN, SSL/IPsec VPN и структурированные кабельные системы для стабильной работы.",
      "svc.server.title": "Серверное администрирование",
      "svc.server.body": "Windows Server, Active Directory и DNS, администрирование Microsoft 365 / Google Workspace, автоматическое резервное копирование NAS для восстановления после сбоев.",
      "svc.iam.title": "Идентификация и доступ (IAM)",
      "svc.iam.body": "Централизованный каталог, SSO и жизненный цикл пользователей с JumpCloud и Microsoft 365 — безопасный онбординг и оффбординг.",
      "svc.endpoint.title": "Безопасность конечных точек и MDM",
      "svc.endpoint.body": "Контроль соответствия устройств, управление обновлениями и учёт активов на macOS и Windows с ManageEngine Endpoint Central и доступом с нулевым доверием.",
      "svc.erp.title": "Администрирование 1С / ERP",
      "svc.erp.body": "Устанавливаю, настраиваю и поддерживаю системы 1С:Предприятие и ERP — интеграции со сканерами штрих-кодов, весовыми терминалами и надёжное резервное копирование.",
      "svc.telephony.title": "IP-телефония и видеонаблюдение",
      "svc.telephony.body": "Развёртываю и обслуживаю Yeastar IP PBX / VoIP-устройства и системы видеонаблюдения CCTV/NVR для безопасных объектов.",
      "svc.telegram.title": "Разработка Telegram-ботов",
      "svc.telegram.body": "Создаю Telegram-ботов для автоматизации, уведомлений, внутренних инструментов и взаимодействия с клиентами.",
      "svc.support.title": "ИТ-поддержка и сервис-деск",
      "svc.support.body": "Поддержка уровня 2/3 с чёткими SLA и анализом первопричин через Jira Service Management — проблемы решаются и документируются.",

      "contact.eyebrow": "Давайте поговорим",
      "contact.h2": "Свяжитесь со мной",
      "contact.lead": "Есть проект, предложение или просто хотите поздороваться? Отправьте сообщение.",
      "contact.remote": "Доступен по всему миру / удалённо",

      "form.name": "Ваше имя",
      "form.email": "Ваш email",
      "form.subject": "Тема",
      "form.message": "Ваше сообщение",
      "form.send": "Отправить сообщение",

      "footer.rights": "Все права защищены.",

      "banner.about": "Обо мне",
      "banner.services": "Услуги",
      "banner.contact": "Связаться со мной",

      "about2.hello": "Всем привет, я",
      "about2.role": "Старший ИТ-специалист и системный администратор",
      "about2.quote": "Тот, кто перестаёт учиться, стар — будь то в двадцать или восемьдесят. Тот, кто продолжает учиться, остаётся молодым.",
      "about2.dob": "21 июля 1992",
      "about2.everywhere": "#Везде",
      "about2.eyebrow2": "Моя история",
      "about2.h2": "О себе",
      "about2.p1": "Я рос в Самарканде до 19 лет, затем провёл семь лет в Куала-Лумпуре — получил степень в Asia Pacific University и начал там карьеру в ИТ, занимаясь поддержкой сетей и хелпдеском.",
      "about2.p2": "С тех пор я выросла до старших ИТ- и системно-административных ролей в Малайзии и Узбекистане: Windows Server и Active Directory, Microsoft 365, управление идентификацией и доступом, безопасность конечных точек (MDM/UEM), межсетевые экраны и VPN, IP-телефония и инфраструктура 1С:Предприятие/ERP. Я технологический энтузиаст и слежу за новостями каждый день.",
      "about2.p3": "Сегодня я поддерживаю удалённую, ориентированную на безопасность команду с моделью нулевого доверия, автоматическим резервным копированием и жёсткими SLA — всё надёжно и хорошо документировано.",
      "about2.stat1": "Лет в ИТ",
      "about2.stat2": "Компаний и ролей",
      "about2.stat3": "Стран работы",

      "services2.h2": "Предложения для моих клиентов",
      "services2.cta.h2": "Есть ИТ-задача?",
      "services2.cta.p": "Давайте обсудим, как я могу помочь с вашей инфраструктурой, безопасностью или системами.",
      "svc2.server.title": "Серверное администрирование",
      "svc2.server.body": "Windows Server, Active Directory и DNS, администрирование Microsoft 365 / Google Workspace, автоматическое резервное копирование NAS.",
      "svc2.iam.title": "Идентификация и доступ (IAM)",
      "svc2.iam.body": "Централизованный каталог, SSO и жизненный цикл пользователей с JumpCloud и Microsoft 365 — безопасный онбординг и оффбординг.",
      "svc2.endpoint.title": "Безопасность конечных точек и MDM",
      "svc2.endpoint.body": "Контроль соответствия устройств, управление обновлениями и учёт активов на macOS и Windows с доступом с нулевым доверием.",
      "svc2.erp.title": "Администрирование 1С / ERP",
      "svc2.erp.body": "Устанавливаю, настраиваю и поддерживаю системы 1С:Предприятие и ERP с интеграциями и надёжным резервным копированием.",
      "svc2.telephony.title": "IP-телефония и видеонаблюдение",
      "svc2.telephony.body": "Развёртываю и обслуживаю Yeastar IP PBX / VoIP-устройства и системы видеонаблюдения CCTV/NVR для безопасных объектов.",
      "svc2.support.title": "ИТ-поддержка и сервис-деск",
      "svc2.support.body": "Поддержка уровня 2/3 с чёткими SLA и анализом первопричин через Jira Service Management.",

      "contact2.address": "Самарканд, Узбекистан — Самария 20",
      "contact2.phone": "+998 93 008 5860 (24/7)"
    }
  };

  var STORAGE_KEY = 'site-lang';

  function getLang(){
    return localStorage.getItem(STORAGE_KEY) || 'en';
  }

  function setLang(lang){
    localStorage.setItem(STORAGE_KEY, lang);
    apply(lang);
    document.querySelectorAll('.lang-toggle').forEach(function(btn){
      btn.textContent = lang === 'ru' ? 'РУ' : 'EN';
    });
    document.documentElement.setAttribute('lang', lang === 'ru' ? 'ru' : 'en');
    document.dispatchEvent(new CustomEvent('site-lang-changed', {detail:{lang:lang}}));
  }

  function apply(lang){
    var d = dict[lang];
    document.querySelectorAll('[data-i18n]').forEach(function(el){
      var key = el.getAttribute('data-i18n');
      if(lang === 'en') return; // English is the markup's original text — nothing to restore from here
      if(d && d[key]) el.textContent = d[key];
    });
    document.querySelectorAll('[data-i18n-html]').forEach(function(el){
      var key = el.getAttribute('data-i18n-html');
      if(lang === 'en') return;
      if(d && d[key]) el.innerHTML = d[key];
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(function(el){
      var key = el.getAttribute('data-i18n-ph');
      if(lang === 'en') return;
      if(d && d[key]) el.setAttribute('placeholder', d[key]);
    });
  }

  // Cache original English text so we can restore it when switching back
  var originals = [];
  document.addEventListener('DOMContentLoaded', function(){
    document.querySelectorAll('[data-i18n]').forEach(function(el){
      originals.push({el:el, type:'text', value: el.textContent});
    });
    document.querySelectorAll('[data-i18n-html]').forEach(function(el){
      originals.push({el:el, type:'html', value: el.innerHTML});
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(function(el){
      originals.push({el:el, type:'ph', value: el.getAttribute('placeholder')});
    });

    var lang = getLang();
    if(lang === 'ru') apply('ru');
    document.querySelectorAll('.lang-toggle').forEach(function(btn){
      btn.textContent = lang === 'ru' ? 'РУ' : 'EN';
      btn.addEventListener('click', function(){
        var next = getLang() === 'ru' ? 'en' : 'ru';
        if(next === 'en'){
          originals.forEach(function(o){
            if(o.type === 'text') o.el.textContent = o.value;
            else if(o.type === 'html') o.el.innerHTML = o.value;
            else if(o.type === 'ph') o.el.setAttribute('placeholder', o.value);
          });
          localStorage.setItem(STORAGE_KEY, 'en');
          document.querySelectorAll('.lang-toggle').forEach(function(b){ b.textContent = 'EN'; });
          document.documentElement.setAttribute('lang', 'en');
          document.dispatchEvent(new CustomEvent('site-lang-changed', {detail:{lang:'en'}}));
        } else {
          setLang('ru');
        }
      });
    });
  });
})();
