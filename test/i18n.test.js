import i18n from "../src/i18n";

const locales = {
  "fr-FR": {
    hello: "bonjour",
    helloUser: "bonjour {user}"
  },
  "zh-CN": {
    hello: "你好",
    helloUser: "你好 {user}"
  }
};

test("translate with only key", () => {
  const key = "hello";
  expect(i18n.translate(locales["fr-FR"], key)).toBe("bonjour");
  expect(i18n.translate(locales["zh-CN"], key)).toBe("你好");
});

test("translate with fallback message", () => {
  const key = "hello";
  expect(i18n.translate(locales["fr-FR"], key, "o/")).toBe("bonjour");
  expect(i18n.translate(locales["zh-CN"], key, "o/")).toBe("你好");
});

test("translate with data", () => {
  const key = "helloUser";
  expect(i18n.translate(locales["fr-FR"], key, "", { user: "toto" })).toBe(
    "bonjour toto"
  );
  expect(i18n.translate(locales["zh-CN"], key, "", { user: "toto" })).toBe(
    "你好 toto"
  );
});

test("translate with unknown key", () => {
  const key = "unknown";
  expect(i18n.translate(locales["fr-FR"], key)).toBe("unknown");
  expect(i18n.translate(locales["zh-CN"], key)).toBe("unknown");
});

test("translate with unknown key and fallback message", () => {
  const key = "unknown";
  expect(i18n.translate(locales["fr-FR"], key, "o/")).toBe("o/");
  expect(i18n.translate(locales["zh-CN"], key, "o/")).toBe("o/");
});

test("translate with undefined locale", () => {
  const key = "hello";
  expect(i18n.translate(locales["es-ES"], key)).toBe("hello");
});

test("translate with undefined locale and fallback message", () => {
  const key = "hello";
  expect(i18n.translate(locales["es-ES"], key, "o/")).toBe("o/");
});

test("translate with undefined locale and fallback message and data", () => {
  const key = "helloUser";
  expect(
    i18n.translate(locales["es-ES"], key, "hello {user}", { user: "toto" })
  ).toBe("hello toto");
});

test("get best language", () => {
  const navigatorLanguage = "en-US";
  const languagesAvailable = ["en-US", "fr-FR", "zh-CN"];
  expect(i18n.getBestLanguage(languagesAvailable, navigatorLanguage)).toBe(
    "en-US"
  );
});

test("get best language with shortcut version", () => {
  const navigatorLanguage = "en";
  const languagesAvailable = ["en-US", "fr-FR", "zh-CN"];
  expect(i18n.getBestLanguage(languagesAvailable, navigatorLanguage)).toBe(
    "en-US"
  );
});

test("get best language with shortcut version reverse", () => {
  const navigatorLanguage = "fr-FR";
  const languagesAvailable = ["en", "fr", "zh"];
  expect(i18n.getBestLanguage(languagesAvailable, navigatorLanguage)).toBe(
    "fr"
  );
});

test("get best language fallback", () => {
  const navigatorLanguage = "es-ES";
  const languagesAvailable = ["en-US", "fr-FR", "zh-CN"];
  const defaultLanguage = "en-US";
  expect(
    i18n.getBestLanguage(languagesAvailable, navigatorLanguage, defaultLanguage)
  ).toBe("en-US");
});

test("get best language with two langs", () => {
  const navigatorLanguage = "zh-CN";
  const languagesAvailable = ["en", "fr", "zh", "zh-CN"];
  expect(i18n.getBestLanguage(languagesAvailable, navigatorLanguage)).toBe(
    "zh-CN"
  );
});

test("get best language with minuscules (thanks Safari)", () => {
  const navigatorLanguage = "zh-cn";
  const languagesAvailable = ["en", "fr", "zh", "zh-CN"];
  expect(i18n.getBestLanguage(languagesAvailable, navigatorLanguage)).toBe(
    "zh-CN"
  );
});

test("get best language with variant", () => {
  const navigatorLanguage = "zh-hk";
  const languagesAvailable = ["en", "fr", "zh", "zh-CN"];
  expect(i18n.getBestLanguage(languagesAvailable, navigatorLanguage)).toBe(
    "zh"
  );
});

test("get best language with navigator language undefined", () => {
  const defaultLanguage = "en-US";
  const languagesAvailable = ["en", "fr", "zh", "zh-CN"];
  expect(
    i18n.getBestLanguage(languagesAvailable, undefined, defaultLanguage)
  ).toBe("en-US");
});
