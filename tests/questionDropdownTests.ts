import { SurveyModel } from "../src/survey";
import { QuestionDropdownModel } from "../src/question_dropdown";
import { ListModel } from "../src/list";
import { createListContainerHtmlElement } from "./utilstests";
import { settings } from "../src/settings";

export default QUnit.module("choicesRestful");

QUnit.test("Test dropdown choicesMax choicesMin properties", function (assert) {
  const json = {
    questions: [
      {
        name: "liveage",
        type: "dropdown",
        choicesMin: 1,
        choicesMax: 115,
      },
    ],
  };
  const survey = new SurveyModel(json);
  const question = <QuestionDropdownModel>survey.getAllQuestions()[0];

  assert.equal(question.choicesMin, 1, "choicesMin is ok");
  assert.equal(question.choicesMax, 115, "choicesMax is ok");
  assert.equal(question.visibleChoices.length, 115, "visibleChoices is ok");
});

QUnit.test("check dropdown disabled class", function (assert) {
  const json = {
    questions: [
      {
        name: "q1",
        type: "dropdown",
      },
    ],
  };
  const survey = new SurveyModel(json);
  const question = <QuestionDropdownModel>survey.getAllQuestions()[0];
  question.cssClasses.controlDisabled = "sv_q_dropdown_disabled";
  assert.ok(question.getControlClass().indexOf("sv_q_dropdown_disabled") == -1);
  question.readOnly = true;
  assert.ok(question.getControlClass().indexOf("sv_q_dropdown_disabled") != -1);
});

QUnit.test("DropdownListModel with ListModel", (assert) => {
  const jsonDropdown = {
    questions: [{
      type: "dropdown",
      name: "question1",
      hasOther: "true",
      choices: [
        "item1",
        "item2",
        "item3",
        "item4",
        "item5",
        "item6",
        "item7",
        "item8",
        "item9",
        "item10",
        "item11",
        "item12",
        "item13",
        "item14",
        "item15",
        "item16",
        "item17",
        "item18",
        "item19",
        "item20",
        "item21",
        "item22",
        "item23",
        "item24",
        "item25",
        "item26",
        "item27"
      ]
    }]
  };
  const survey = new SurveyModel(jsonDropdown);
  const question = <QuestionDropdownModel>survey.getAllQuestions()[0];
  assert.ok(question.popupModel.contentComponentData.model instanceof ListModel);
});

QUnit.test("Test dropdown renderAs select", assert => {
  const json = {
    questions: [{
      type: "dropdown",
      name: "question1",
      hasOther: "true",
      choices: [
        "item1",
        "item2",
        "item3",
        "item4",
        "item5",
        "item6",
        "item7",
        "item8",
        "item9",
        "item10",
        "item11",
        "item12",
        "item13",
        "item14",
        "item15",
        "item16",
        "item17",
        "item18",
        "item19",
        "item20",
        "item21",
        "item22",
        "item23",
        "item24",
        "item25",
        "item26",
        "item27"
      ]
    }]
  };
  const survey = new SurveyModel(json);
  const question = <QuestionDropdownModel>survey.getAllQuestions()[0];

  assert.ok(!!question.popupModel);
  assert.ok(question.popupModel.contentComponentData.model instanceof ListModel);

  const listModel = question.popupModel.contentComponentData.model as ListModel;
  assert.equal(listModel.showFilter, false);
  assert.equal(question.dropdownListModel.searchEnabled, true);
});

QUnit.test("Test dropdown renderAs select searchEnabled property", assert => {
  const json = {
    questions: [{
      type: "dropdown",
      name: "question1",
      hasOther: "true",
      searchEnabled: false,
      choices: [
        "item1",
        "item2",
        "item3",
        "item4",
        "item5",
        "item6",
        "item7",
        "item8",
        "item9",
        "item10",
        "item11",
        "item12",
        "item13",
        "item14",
        "item15",
        "item16",
        "item17",
        "item18",
        "item19",
        "item20",
        "item21",
        "item22",
        "item23",
        "item24",
        "item25",
        "item26",
        "item27"
      ]
    }]
  };
  const survey = new SurveyModel(json);
  const question = <QuestionDropdownModel>survey.getAllQuestions()[0];
  const listModel = question.popupModel.contentComponentData.model as ListModel;
  assert.equal(listModel.showFilter, false);
  assert.equal(question.dropdownListModel.searchEnabled, false);

  question.searchEnabled = true;
  assert.equal(listModel.showFilter, false);
  assert.equal(question.dropdownListModel.searchEnabled, true);
});

QUnit.test("add placeholder & allowClear", assert => {
  const json = {
    questions: [
      {
        "type": "dropdown",
        "name": "car",
        "title": "What car are you driving?",
        "choices": [
          "Ford",
          "Vauxhall",
          "Volkswagen",
          "Nissan",
          "Audi",
          "Mercedes-Benz",
          "BMW",
          "Peugeot",
          "Toyota",
          "Citroen"
        ]
      }]
  };
  const survey = new SurveyModel(json);
  const question = <QuestionDropdownModel>survey.getAllQuestions()[0];

  assert.equal(question.placeholder, "Select...");
  assert.ok(question.allowClear === true);

  assert.deepEqual(question.toJSON(), {
    "name": "car",
    "title": "What car are you driving?",
    "choices": [
      "Ford",
      "Vauxhall",
      "Volkswagen",
      "Nissan",
      "Audi",
      "Mercedes-Benz",
      "BMW",
      "Peugeot",
      "Toyota",
      "Citroen"
    ]
  });
  question.placeholder = "New placeholder";
  question.allowClear = false;

  assert.deepEqual(question.toJSON(), {
    "name": "car",
    "title": "What car are you driving?",
    "allowClear": false,
    "placeholder": "New placeholder",
    "choices": [
      "Ford",
      "Vauxhall",
      "Volkswagen",
      "Nissan",
      "Audi",
      "Mercedes-Benz",
      "BMW",
      "Peugeot",
      "Toyota",
      "Citroen"
    ]
  });
});

QUnit.test("deserialize showOptionsCaption & optionsCaption to placeholder & allowClear", assert => {
  const json = {
    questions: [
      {
        "type": "dropdown",
        "name": "car",
        "title": "What car are you driving?",
        "showOptionsCaption": false,
        "optionsCaption": "New optionsCaption",
        "choices": [
          "Ford",
          "Vauxhall",
          "Volkswagen",
          "Nissan",
          "Audi",
          "Mercedes-Benz",
          "BMW",
          "Peugeot",
          "Toyota",
          "Citroen"
        ]
      }]
  };
  const survey = new SurveyModel(json);
  const question = <QuestionDropdownModel>survey.getAllQuestions()[0];

  assert.equal(question.placeholder, "New optionsCaption");
  assert.equal(question.optionsCaption, "New optionsCaption");

  assert.ok(question.showOptionsCaption === false);
  assert.ok(question.allowClear === false);

  assert.deepEqual(question.toJSON(), {
    "name": "car",
    "title": "What car are you driving?",
    "allowClear": false,
    "placeholder": "New optionsCaption",
    "choices": [
      "Ford",
      "Vauxhall",
      "Volkswagen",
      "Nissan",
      "Audi",
      "Mercedes-Benz",
      "BMW",
      "Peugeot",
      "Toyota",
      "Citroen"
    ]
  });
});

QUnit.test("ListModel localization", assert => {
  const json = {
    questions: [
      {
        "type": "dropdown",
        "name": "car",
        "title": "What car are you driving?",
        "showOptionsCaption": false,
        "optionsCaption": "New optionsCaption",
        "choices": [
          "Ford",
          "Vauxhall",
          "Volkswagen",
          "Nissan",
          "Audi",
          "Mercedes-Benz",
          "BMW",
          "Peugeot",
          "Toyota",
          "Citroen"
        ]
      }]
  };
  const survey = new SurveyModel(json);
  const question = <QuestionDropdownModel>survey.getAllQuestions()[0];
  const listModel = question.popupModel.contentComponentData.model as ListModel;
  assert.equal(listModel.filterStringPlaceholder, "Type to search...", "filtered text in en");
  survey.locale = "de";
  assert.equal(listModel.filterStringPlaceholder, "Tippe um zu suchen...", "filtered text in de");
  survey.locale = "";
});
QUnit.test("readOnlyText default", assert => {
  const json = {
    questions: [
      {
        "type": "dropdown",
        "name": "q1",
        "placeholder": "click",
        "hasOther": true,
        "choices": [{ value: 1, text: "item 1" }, { value: 2, text: "item 2" }, { value: 3, text: "item 3" }]
      }]
  };
  const survey = new SurveyModel(json);
  survey.onTextMarkdown.add((sender, options) => {
    options.html = options.text + "_" + options.text;
  });
  const question = <QuestionDropdownModel>survey.getAllQuestions()[0];
  assert.equal(question.readOnlyText, "click", "use place-holder");
  question.value = "other";
  assert.equal(question.readOnlyText, "", "use other");
  question.value = "none";
  assert.equal(question.readOnlyText, "", "use none text");
  question.value = 2;
  assert.equal(question.readOnlyText, "", "use choice text");
});
QUnit.test("readOnlyText render as select", assert => {
  const json = {
    questions: [
      {
        "type": "dropdown",
        "name": "q1",
        "renderAs": "select",
        "placeholder": "click",
        "hasOther": true,
        "showNoneItem": true,
        "choices": [{ value: 1, text: "item 1" }, { value: 2, text: "item 2" }, { value: 3, text: "item 3" }]
      }]
  };
  const survey = new SurveyModel(json);
  survey.onTextMarkdown.add((sender, options) => {
    options.html = options.text + "_" + options.text;
  });
  const question = <QuestionDropdownModel>survey.getAllQuestions()[0];
  assert.equal(question.readOnlyText, "click", "use place-holder");
  question.value = "other";
  assert.equal(question.readOnlyText, "Other (describe)", "use other");
  question.value = 2;
  assert.equal(question.readOnlyText, "item 2", "use choice text");
  question.value = "none";
  assert.equal(question.readOnlyText, "None", "use none text");
  question.clearValue();
  assert.equal(question.readOnlyText, "click", "use placeholder");
  question.placeholder = "Placeholder test";
  assert.equal(question.readOnlyText, "Placeholder test", "use placeholder");
});
QUnit.test("readOnlyText on changing locale", assert => {
  const json = {
    questions: [
      {
        "type": "dropdown",
        "name": "q1",
        "hasOther": true,
        "choices": [{ value: 1, text: "item 1" }, { value: 2, text: "item 2" }, { value: 3, text: "item 3" }]
      }]
  };
  const survey = new SurveyModel();
  survey.setDesignMode(true);
  survey.fromJSON(json);
  const question = <QuestionDropdownModel>survey.getAllQuestions()[0];
  assert.equal(question.readOnlyText, "Select...", "english locale");
  survey.locale = "de";
  assert.equal(question.readOnlyText, "Bitte auswählen...", "de locale");
  survey.locale = "";
  assert.equal(new QuestionDropdownModel("q1").readOnlyText, "Select...", "English by default");
});
QUnit.test("inputFieldComponent", assert => {
  const json = {
    questions: [
      {
        "type": "dropdown",
        "itemComponent": "my-item",
        "name": "q1",
        "hasOther": true,
        "choices": [{ value: 1, text: "item 1" }, { value: 2, text: "item 2" }, { value: 3, text: "item 3" }]
      }]
  };
  const itemTemplate = "my-item";
  const newInputFieldComponent = "my-inputFieldComponentName";
  const survey = new SurveyModel();
  survey.setDesignMode(true);
  survey.fromJSON(json);
  const question = <QuestionDropdownModel>survey.getAllQuestions()[0];
  assert.equal(question.itemComponent, itemTemplate);
  assert.equal(question.inputFieldComponent, undefined);
  assert.equal(question.inputFieldComponentName, itemTemplate);

  question.inputFieldComponent = newInputFieldComponent;
  assert.equal(question.itemComponent, itemTemplate);
  assert.equal(question.inputFieldComponent, newInputFieldComponent);
  assert.equal(question.inputFieldComponentName, newInputFieldComponent);
});
QUnit.test("showSelectedItemLocText", assert => {
  const json = {
    questions: [
      {
        "type": "dropdown",
        "name": "q1",
        "hasOther": true,
        "choices": [{ value: 1, text: "item 1" }, { value: 2, text: "item 2" }, { value: 3, text: "item 3" }]
      }]
  };
  const survey = new SurveyModel();
  survey.setDesignMode(true);
  survey.fromJSON(json);
  const question = <QuestionDropdownModel>survey.getAllQuestions()[0];
  assert.equal(question.showSelectedItemLocText, false);

  question.value = 1;
  assert.equal(question.showSelectedItemLocText, true);

  question.itemComponent = "my-item";
  assert.equal(question.showSelectedItemLocText, false);
});
QUnit.test("selectedItemLocText, hasOther & storeOthersAsComment=false, Bug#3800", assert => {
  const json = {
    storeOthersAsComment: false,
    questions: [
      {
        "type": "dropdown",
        "name": "q1",
        "hasOther": true,
        "choices": [1, 2, 3],
        showOtherItem: true
      }]
  };
  const survey = new SurveyModel(json);
  survey.data = { q1: 4 };
  const question = <QuestionDropdownModel>survey.getAllQuestions()[0];
  assert.equal(question.showSelectedItemLocText, true);

  assert.equal(question.selectedItem.value, "other");
  assert.equal(question.selectedItemLocText.renderedHtml, "Other (describe)");
  question.value = 3;
  assert.equal(question.selectedItem.value, "3");
  assert.equal(question.selectedItemLocText.renderedHtml, "3");
});
QUnit.test("showInputFieldComponent", assert => {
  const json = {
    questions: [
      {
        "type": "dropdown",
        "name": "q1",
        "hasOther": true,
        "choices": [{ value: 1, text: "item 1" }, { value: 2, text: "item 2" }, { value: 3, text: "item 3" }]
      }]
  };
  const survey = new SurveyModel();
  survey.setDesignMode(true);
  survey.fromJSON(json);
  const question = <QuestionDropdownModel>survey.getAllQuestions()[0];
  assert.equal(question.showInputFieldComponent, false);

  question.itemComponent = "my-item";
  assert.equal(question.showInputFieldComponent, false);

  question.value = 1;
  assert.equal(question.showInputFieldComponent, true);
});
QUnit.test("clearValue", assert => {
  const json = {
    questions: [
      {
        "type": "dropdown",
        "name": "q1",
        "hasOther": true,
        "choices": [{ value: 1, text: "item 1" }, { value: 2, text: "item 2" }, { value: 3, text: "item 3" }]
      }]
  };
  const survey = new SurveyModel();
  survey.setDesignMode(true);
  survey.fromJSON(json);
  const question = <QuestionDropdownModel>survey.getAllQuestions()[0];
  const dropdownListModel = question.dropdownListModel;

  assert.equal(question.value, undefined, "init");
  assert.equal(dropdownListModel.filterString, "", "init");
  assert.equal(dropdownListModel.inputStringRendered, "", "init");
  assert.equal(dropdownListModel.hintString, "", "init");

  question.value = 2;
  dropdownListModel.inputStringRendered = "i";

  assert.equal(question.value, 2);
  assert.equal(dropdownListModel.filterString, "i");
  assert.equal(dropdownListModel.inputStringRendered, "i");
  assert.equal(dropdownListModel.hintString, "item 2");

  question.clearValue();

  assert.equal(question.value, undefined, "after clear");
  assert.equal(dropdownListModel.filterString, "", "after clear");
  assert.equal(dropdownListModel.inputStringRendered, "", "after clear");
  assert.equal(dropdownListModel.hintString, "", "after clear");
});

QUnit.test("hasScroll property", assert => {
  const json = {
    questions: [
      {
        "type": "dropdown",
        "name": "q1",
        "hasOther": true,
        "choices": [{ value: 1, text: "item 1" }, { value: 2, text: "item 2" }, { value: 3, text: "item 3" }]
      }]
  };
  const survey = new SurveyModel();
  survey.fromJSON(json);
  const question = <QuestionDropdownModel>survey.getAllQuestions()[0];
  const element = createListContainerHtmlElement();
  question.dropdownListModel["listModel"].initListContainerHtmlElement(element);

  assert.equal(question.dropdownListModel.hasScroll, false);

  question.dropdownListModel["listModel"].hasVerticalScroller = true;
  assert.equal(question.dropdownListModel.hasScroll, true);

  document.body.removeChild(element);
});

function getNumberArray(skip = 1, count = 25, filter = ""): Array<number> {
  const result: Array<number> = [];
  let index = skip;
  while ((skip + result.length) < (skip + count)) {
    if (!!filter) {
      if (index.toString().toLowerCase().indexOf(filter.toLocaleLowerCase()) !== -1) {
        result.push(index);
      }
    }
    else {
      result.push(index);
    }
    index++;
  }
  return result;
}

const callback = (_, opt) => {
  const total = 55;
  setTimeout(() => {
    if(opt.skip + opt.take < total) {
      opt.setItems(getNumberArray(opt.skip + 1, opt.take, opt.filter), total);
    } else {
      opt.setItems(getNumberArray(opt.skip + 1, total - opt.skip, opt.filter), total);
    }
  }, 500);
};

QUnit.test("lazy loading: first loading", assert => {
  const done = assert.async();
  const json = {
    questions: [{
      "type": "dropdown",
      "name": "q1",
      "choicesLazyLoadEnabled": true,
      "choicesLazyLoadPageSize": 30,
    }]
  };
  const survey = new SurveyModel(json);
  survey.onChoicesLazyLoad.add(callback);

  const question = <QuestionDropdownModel>survey.getAllQuestions()[0];
  assert.equal(question.choicesLazyLoadEnabled, true);
  assert.equal(question.choices.length, 0);

  question.dropdownListModel.popupModel.isVisible = true;
  setTimeout(() => {
    assert.equal(question.choices.length, 30);
    assert.equal(question.choices[0].value, 1);
    assert.equal(question.choices[29].value, 30);
    done();
  }, 550);
});

QUnit.test("lazy loading: several loading", assert => {
  const done1 = assert.async();
  const done2 = assert.async();
  const done3 = assert.async();
  const json = {
    questions: [{
      "type": "dropdown",
      "name": "q1",
      "choicesLazyLoadEnabled": true
    }]
  };
  const survey = new SurveyModel(json);
  survey.onChoicesLazyLoad.add(callback);

  const question = <QuestionDropdownModel>survey.getAllQuestions()[0];
  assert.equal(question.choicesLazyLoadEnabled, true);
  assert.equal(question.choices.length, 0);

  question.dropdownListModel.popupModel.toggleVisibility();
  setTimeout(() => {
    assert.equal(question.choices.length, 25);
    assert.equal(question.choices[0].value, 1);
    assert.equal(question.choices[24].value, 25);

    question.dropdownListModel["updateQuestionChoices"]();
    setTimeout(() => {
      assert.equal(question.choices.length, 50);
      assert.equal(question.choices[0].value, 1);
      assert.equal(question.choices[49].value, 50);

      question.dropdownListModel["updateQuestionChoices"]();
      setTimeout(() => {
        assert.equal(question.choices.length, 55);
        assert.equal(question.choices[0].value, 1);
        assert.equal(question.choices[54].value, 55);

        done3();
      }, 550);

      done2();
    }, 550);

    done1();
  }, 550);
});

QUnit.test("storeOthersAsComment is false", assert => {
  const json = {
    "storeOthersAsComment": false,
    "elements": [
      {
        "type": "dropdown",
        "name": "q1",
        "showOtherItem": true
      }
    ],
    "showQuestionNumbers": false
  };
  const survey = new SurveyModel(json);
  survey.onChoicesLazyLoad.add(callback);

  const question = <QuestionDropdownModel>survey.getAllQuestions()[0];
  assert.equal(question.visibleChoices.length, 1);
  assert.equal(question.visibleChoices[0].id, "other");
  assert.equal(question.visibleChoices[0].value, "other");

  question.renderedValue = "other";
  assert.deepEqual(question.value, "other", "#1");
  question.comment = "text1";
  assert.deepEqual(question.value, "text1", "#2");
  assert.deepEqual(survey.data, { q1: "text1" }, "#3");
});

QUnit.test("lazy loading: storeOthersAsComment is false", assert => {
  const done = assert.async();
  const json = {
    "storeOthersAsComment": false,
    "elements": [
      {
        "type": "dropdown",
        "name": "q1",
        "choicesLazyLoadEnabled": true,
        "choicesLazyLoadPageSize": 60,
        "showOtherItem": true
      }
    ],
    "showQuestionNumbers": false
  };
  const survey = new SurveyModel(json);
  survey.onChoicesLazyLoad.add(callback);

  const question = <QuestionDropdownModel>survey.getAllQuestions()[0];
  assert.equal(question.choicesLazyLoadEnabled, true);
  assert.equal(question.visibleChoices.length, 1);
  assert.equal(question.visibleChoices[0].id, "other");
  assert.equal(question.visibleChoices[0].value, "other");

  question.dropdownListModel.popupModel.isVisible = true;
  setTimeout(() => {
    assert.equal(question.visibleChoices.length, 56);
    assert.equal(question.visibleChoices[0].value, 1);
    assert.equal(question.visibleChoices[54].value, 55);
    assert.equal(question.visibleChoices[55].id, "other");
    assert.equal(question.visibleChoices[55].value, "other");

    question.renderedValue = "other";
    assert.deepEqual(question.value, "other", "#1");
    question.comment = "text1";
    assert.deepEqual(question.value, "text1", "#2");
    assert.deepEqual(survey.data, { q1: "text1" }, "#3");
    done();
  }, 550);
});

QUnit.test("itemsSettings property", assert => {
  const done1 = assert.async();
  const done2 = assert.async();
  const json = {
    questions: [{
      "type": "dropdown",
      "name": "q1",
      "choicesLazyLoadEnabled": true
    }]
  };
  const survey = new SurveyModel(json);
  survey.onChoicesLazyLoad.add(callback);

  const question = <QuestionDropdownModel>survey.getAllQuestions()[0];
  const listModel = question.popupModel.contentComponentData.model as ListModel;
  const itemsSettings = question.dropdownListModel["itemsSettings"];
  assert.equal(itemsSettings.skip, 0);
  assert.equal(itemsSettings.take, 25);
  assert.equal(itemsSettings.totalCount, 0);
  assert.equal(itemsSettings.items.length, 0);
  assert.equal(listModel.actions.length, 0, "listModel.actions");

  question.dropdownListModel.popupModel.isVisible = true;

  setTimeout(() => {
    assert.equal(listModel.actions.length, 26, "listModel.actions");
    assert.equal(itemsSettings.skip, 25);
    assert.equal(itemsSettings.take, 25);
    assert.equal(itemsSettings.totalCount, 55);
    assert.equal(itemsSettings.items.length, 25);

    question.dropdownListModel.popupModel.isVisible = false;

    setTimeout(() => {
      assert.equal(listModel.actions.length, 26, "listModel.actions");
      assert.equal(itemsSettings.skip, 0);
      assert.equal(itemsSettings.take, 25);
      assert.equal(itemsSettings.totalCount, 0);
      assert.equal(itemsSettings.items.length, 0);

      question.dropdownListModel.popupModel.isVisible = true;
      assert.equal(listModel.actions.length, 0, "listModel.actions");

      done2();
    }, 550);

    done1();
  }, 550);
});

QUnit.test("Test dropdown choices change should update strings", function (assert) {
  const json = {
    questions: [
      {
        name: "liveage",
        type: "dropdown",
        choices: ["i1", "i2"]
      },
    ],
  };
  const survey = new SurveyModel(json);
  const question = <QuestionDropdownModel>survey.getAllQuestions()[0];

  assert.equal(question.readOnlyText, "Select...");
  question.value = "i3";
  assert.equal(question.readOnlyText, "");
  question.choices = ["i1", "i2", "i3"];
  assert.equal(question.readOnlyText, "");
});

QUnit.test("min page size", assert => {
  const done1 = assert.async();
  const json = {
    questions: [{
      "type": "dropdown",
      "name": "q1",
      "choicesLazyLoadEnabled": true,
      choicesLazyLoadPageSize: 10
    }]
  };
  const survey = new SurveyModel(json);
  survey.onChoicesLazyLoad.add(callback);

  const question = <QuestionDropdownModel>survey.getAllQuestions()[0];
  const listModel = question.popupModel.contentComponentData.model as ListModel;
  const itemsSettings = question.dropdownListModel["itemsSettings"];
  assert.equal(itemsSettings.skip, 0);
  assert.equal(itemsSettings.take, 25);
  assert.equal(itemsSettings.totalCount, 0);
  assert.equal(itemsSettings.items.length, 0);
  assert.equal(listModel.actions.length, 0, "listModel.actions");

  question.dropdownListModel.popupModel.isVisible = true;

  setTimeout(() => {
    assert.equal(listModel.actions.length, 26, "listModel.actions");
    assert.equal(itemsSettings.skip, 25);
    assert.equal(itemsSettings.take, 25);
    assert.equal(itemsSettings.totalCount, 55);
    assert.equal(itemsSettings.items.length, 25);

    done1();
  }, 550);
});

QUnit.test("selectedItem until all data is loaded", assert => {
  const done = assert.async(3);

  const json = {
    questions: [{
      "type": "dropdown",
      "name": "q1",
      "choicesLazyLoadEnabled": true,
      "choicesLazyLoadPageSize": 30
    }]
  };
  const survey = new SurveyModel(json);
  survey.onChoicesLazyLoad.add(callback);

  const question = <QuestionDropdownModel>survey.getAllQuestions()[0];
  const listModel = question.popupModel.contentComponentData.model as ListModel;

  assert.equal(listModel.actions.length, 0, "listModel.actions");
  assert.equal(question.selectedItem, null);

  question.dropdownListModel.popupModel.toggleVisibility();
  setTimeout(() => {
    assert.equal(question.choices.length, 30);
    assert.equal(listModel.actions.length, 31, "listModel.actions");

    question.dropdownListModel["updateQuestionChoices"]();
    setTimeout(() => {
      assert.equal(question.choices.length, 55);
      assert.equal(listModel.actions.length, 55, "listModel.actions");
      assert.equal(question.choices[54].value, 55);

      question.value = question.choices[54].value;
      assert.equal(question.selectedItem.value, 55);

      question.dropdownListModel.popupModel.isVisible = false;
      question.dropdownListModel.popupModel.isVisible = true;

      setTimeout(() => {
        assert.equal(question.choices.length, 30);
        assert.equal(listModel.actions.length, 31, "listModel.actions");
        assert.equal(question.selectedItem.value, 55);

        question.clearValue();
        assert.equal(question.selectedItem, null);

        done();
      }, 550);

      done();
    }, 550);

    done();
  }, 550);

});
function getObjectArray(skip = 1, count = 25): Array<{value: number, text: string}> {
  const result:Array<{value: number, text: string}> = [];
  for(let index = skip; index < (skip + count); index++) {
    result.push({ value: index, text: "DisplayText_" + index });
  }
  return result;
}

QUnit.test("lazy loading + onGetChoiceDisplayValue: defaultValue", assert => {
  const done = assert.async();
  const json = {
    questions: [{
      "type": "dropdown",
      "name": "q1",
      "defaultValue": 55,
      "choicesLazyLoadEnabled": true
    }]
  };
  const survey = new SurveyModel(json);
  survey.onChoicesLazyLoad.add((sender, options) => {
    const total = 55;
    setTimeout(() => {
      if(options.skip + options.take < total) {
        options.setItems(getObjectArray(options.skip + 1, options.take), total);
      } else {
        options.setItems(getObjectArray(options.skip + 1, total - options.skip), total);
      }
    }, 500);
  });
  survey.onGetChoiceDisplayValue.add((sender, options) => {
    if(options.question.name == "q1") {
      options.setItems(options.values.map(item => ("DisplayText_" + item)));
    }
  });

  const question = <QuestionDropdownModel>survey.getAllQuestions()[0];
  assert.equal(question.choicesLazyLoadEnabled, true);
  assert.equal(question.choices.length, 0);
  assert.equal(question.value, 55);
  assert.equal(question.selectedItem.value, 55);
  assert.equal(question.selectedItem.text, "DisplayText_55");

  question.dropdownListModel.popupModel.isVisible = true;
  setTimeout(() => {
    assert.equal(question.choices.length, 25);
    assert.equal(question.choices[0].value, 1);
    assert.equal(question.choices[24].value, 25);
    assert.equal(question.value, 55);
    assert.equal(question.selectedItem.value, 55);
    assert.equal(question.selectedItem.text, "DisplayText_55");
    done();
  }, 550);
});

QUnit.test("lazy loading + onGetChoiceDisplayValue: defaultValue is object", assert => {
  const done = assert.async();
  const json = {
    questions: [{
      "type": "dropdown",
      "name": "q1",
      "defaultValue": { id: 55 },
      "choicesLazyLoadEnabled": true
    }]
  };
  const survey = new SurveyModel(json);
  survey.onChoicesLazyLoad.add((sender, options) => {
    const total = 55;
    setTimeout(() => {
      if(options.skip + options.take < total) {
        options.setItems(getObjectArray(options.skip + 1, options.take), total);
      } else {
        options.setItems(getObjectArray(options.skip + 1, total - options.skip), total);
      }
    }, 500);
  });
  survey.onGetChoiceDisplayValue.add((sender, options) => {
    if(options.question.name == "q1") {
      options.setItems(options.values.map(item => ("DisplayText_" + item.id)));
    }
  });

  const question = <QuestionDropdownModel>survey.getAllQuestions()[0];
  assert.equal(question.choicesLazyLoadEnabled, true);
  assert.equal(question.choices.length, 0);
  assert.equal(question.value.id, 55);
  assert.equal(question.selectedItem.value.id, 55);
  assert.equal(question.selectedItem.text, "DisplayText_55");
  assert.equal(question.dropdownListModel.inputString, "DisplayText_55");

  question.dropdownListModel.popupModel.isVisible = true;
  setTimeout(() => {
    assert.equal(question.choices.length, 25);
    assert.equal(question.choices[0].value, 1);
    assert.equal(question.choices[24].value, 25);
    assert.equal(question.value.id, 55);
    assert.equal(question.selectedItem.value.id, 55);
    assert.equal(question.selectedItem.text, "DisplayText_55");
    assert.equal(question.dropdownListModel.inputString, "DisplayText_55");
    done();
  }, 550);
});

QUnit.test("lazy loading + onGetChoiceDisplayValue: set survey data", assert => {
  const done = assert.async();
  const json = {
    questions: [{
      "type": "dropdown",
      "name": "q1",
      "choicesLazyLoadEnabled": true
    }]
  };
  const survey = new SurveyModel(json);
  survey.onChoicesLazyLoad.add((sender, options) => {
    const total = 55;
    setTimeout(() => {
      if(options.skip + options.take < total) {
        options.setItems(getObjectArray(options.skip + 1, options.take), total);
      } else {
        options.setItems(getObjectArray(options.skip + 1, total - options.skip), total);
      }
    }, 500);
  });
  survey.onGetChoiceDisplayValue.add((sender, options) => {
    if(options.question.name == "q1") {
      options.setItems(options.values.map(item => ("DisplayText_" + item)));
    }
  });
  survey.data = { "q1": 55 };

  const question = <QuestionDropdownModel>survey.getAllQuestions()[0];
  assert.equal(question.choicesLazyLoadEnabled, true);
  assert.equal(question.choices.length, 0);
  assert.equal(question.value, 55);
  assert.equal(question.selectedItem.value, 55);
  assert.equal(question.selectedItem.text, "DisplayText_55");

  question.dropdownListModel.popupModel.isVisible = true;
  setTimeout(() => {
    assert.equal(question.choices.length, 25);
    assert.equal(question.choices[0].value, 1);
    assert.equal(question.choices[24].value, 25);
    assert.equal(question.value, 55);
    assert.equal(question.selectedItem.value, 55);
    assert.equal(question.selectedItem.text, "DisplayText_55");
    done();
  }, 550);
});

QUnit.test("lazy loading data is lost: defaultValue", assert => {
  const done = assert.async();
  const json = {
    questions: [{
      "type": "dropdown",
      "name": "q1",
      "defaultValue": 55,
      "choicesLazyLoadEnabled": true
    }]
  };
  const survey = new SurveyModel(json);
  survey.onChoicesLazyLoad.add((sender, options) => {
    const total = 55;
    setTimeout(() => {
      if(options.skip + options.take < total) {
        options.setItems(getObjectArray(options.skip + 1, options.take), total);
      } else {
        options.setItems(getObjectArray(options.skip + 1, total - options.skip), total);
      }
    }, 500);
  });
  survey.onGetChoiceDisplayValue.add((sender, options) => {
    if(options.question.name == "q1") {
      options.setItems(options.values.map(item => ("DisplayText_" + item)));
    }
  });

  assert.deepEqual(survey.data, { "q1": 55 }, "before doComplete before item load");
  survey.doComplete();
  assert.deepEqual(survey.data, { "q1": 55 }, "after doComplete before item load");

  const question = <QuestionDropdownModel>survey.getAllQuestions()[0];
  assert.equal(question.choices.length, 0);
  assert.equal(question.value, 55);

  question.dropdownListModel.popupModel.isVisible = true;
  setTimeout(() => {
    assert.equal(question.choices.length, 25);
    assert.equal(question.value, 55);

    assert.deepEqual(survey.data, { "q1": 55 }, "before doComplete after item load");
    survey.doComplete();
    assert.deepEqual(survey.data, { "q1": 55 }, "after doComplete after item load");

    done();
  }, 550);
});

QUnit.test("lazy loading data is lost: set survey data", assert => {
  const done = assert.async();
  const json = {
    questions: [{
      "type": "dropdown",
      "name": "q1",
      "choicesLazyLoadEnabled": true
    }]
  };
  const survey = new SurveyModel(json);
  survey.onChoicesLazyLoad.add((sender, options) => {
    const total = 55;
    setTimeout(() => {
      if(options.skip + options.take < total) {
        options.setItems(getObjectArray(options.skip + 1, options.take), total);
      } else {
        options.setItems(getObjectArray(options.skip + 1, total - options.skip), total);
      }
    }, 500);
  });
  survey.onGetChoiceDisplayValue.add((sender, options) => {
    if(options.question.name == "q1") {
      options.setItems(options.values.map(item => ("DisplayText_" + item)));
    }
  });
  survey.data = { "q1": 55 };
  assert.deepEqual(survey.data, { "q1": 55 }, "before doComplete before item load");
  survey.doComplete();
  assert.deepEqual(survey.data, { "q1": 55 }, "after doComplete before item load");

  const question = <QuestionDropdownModel>survey.getAllQuestions()[0];
  assert.equal(question.choices.length, 0);
  assert.equal(question.value, 55);

  question.dropdownListModel.popupModel.isVisible = true;
  setTimeout(() => {
    assert.equal(question.choices.length, 25);
    assert.equal(question.value, 55);

    assert.deepEqual(survey.data, { "q1": 55 }, "before doComplete after item load");
    survey.doComplete();
    assert.deepEqual(survey.data, { "q1": 55 }, "after doComplete after item load");

    done();
  }, 550);
});

QUnit.test("lazy loading + change filter string", assert => {
  const done1 = assert.async();
  const done2 = assert.async();
  const done3 = assert.async();
  const json = {
    questions: [{
      "type": "dropdown",
      "name": "q1",
      "choicesLazyLoadEnabled": true
    }]
  };
  const survey = new SurveyModel(json);
  survey.onChoicesLazyLoad.add(callback);

  const question = <QuestionDropdownModel>survey.getAllQuestions()[0];
  const itemsSettings = question.dropdownListModel["itemsSettings"];

  assert.equal(question.choicesLazyLoadEnabled, true);
  assert.equal(question.choices.length, 0);
  assert.equal(itemsSettings.skip, 0);
  assert.equal(itemsSettings.take, 25);
  assert.equal(itemsSettings.totalCount, 0);
  assert.equal(itemsSettings.items.length, 0);

  question.dropdownListModel.popupModel.toggleVisibility();
  setTimeout(() => {
    assert.equal(question.choices.length, 25);
    assert.equal(question.choices[0].value, 1);
    assert.equal(question.choices[24].value, 25);
    assert.equal(itemsSettings.skip, 25);
    assert.equal(itemsSettings.take, 25);
    assert.equal(itemsSettings.totalCount, 55);
    assert.equal(itemsSettings.items.length, 25);

    question.dropdownListModel.filterString = "2";
    setTimeout(() => {
      assert.equal(question.choices.length, 25);
      assert.equal(question.choices[0].value, 2);
      assert.equal(question.choices[24].value, 123);
      assert.equal(itemsSettings.skip, 25);
      assert.equal(itemsSettings.take, 25);
      assert.equal(itemsSettings.totalCount, 55);
      assert.equal(itemsSettings.items.length, 25);

      question.dropdownListModel.filterString = "22";
      setTimeout(() => {
        assert.equal(question.choices.length, 25);
        assert.equal(question.choices[0].value, 22);
        assert.equal(question.choices[24].value, 1223);
        assert.equal(itemsSettings.skip, 25);
        assert.equal(itemsSettings.take, 25);
        assert.equal(itemsSettings.totalCount, 55);
        assert.equal(itemsSettings.items.length, 25);

        done3();
      }, 550);

      done2();
    }, 550);

    done1();
  }, 550);
});
QUnit.test("show comment and show other together", assert => {
  const json = {
    questions: [{
      "type": "dropdown",
      "name": "q1",
      "showOtherItem": true,
      "showCommentArea": true,
      "choices": [1, 2, 3]
    }]
  };
  const survey = new SurveyModel(json);
  const question = <QuestionDropdownModel>survey.getAllQuestions()[0];
  assert.equal(question.showOtherItem, true, "showOtherItem is true");
  assert.equal(question.showCommentArea, true, "hasComment is true");
  assert.equal(question.getStoreOthersAsComment(), false, "we have show comment");
  question.showCommentArea = false;
  assert.equal(question.getStoreOthersAsComment(), true, "show comment is hidden");
  question.showCommentArea = true;
  assert.equal(question.getStoreOthersAsComment(), false, "show comment again");
});

QUnit.test("ItemValue: check action fields", assert => {
  const json = {
    questions: [{
      "type": "dropdown",
      itemComponent: "custom-component",
      defaultValue: "Item1",
      "choices": [{ text: "Item 1", value: "Item1" }, { text: "Item 2", value: "Item2" }]
    }]
  };
  const survey = new SurveyModel(json);
  const question = <QuestionDropdownModel>survey.getAllQuestions()[0];
  assert.equal(question.visibleChoices[0].component, "custom-component");
  assert.equal(question.visibleChoices[0].locTitle.text, "Item 1");
  assert.equal(question.visibleChoices[0].title, "Item 1");
  assert.equal(question.visibleChoices[0].id, "Item1");
  assert.equal(question.visibleChoices[0].data, question.visibleChoices[0]);
  assert.equal(question.visibleChoices[0].visible, true);
  question.visibleChoices[0].setIsVisible(false);
  assert.equal(question.visibleChoices[0].visible, false);
  assert.equal(question.visibleChoices[0].enabled, true);
  question.visibleChoices[0].setIsEnabled(false);
  assert.equal(question.visibleChoices[0].enabled, false);
  assert.equal(question.visibleChoices[0].selected, true);
  assert.equal(question.visibleChoices[1].selected, false);
  question.value = "Item2";
  assert.equal(question.visibleChoices[0].selected, false);
  assert.equal(question.visibleChoices[1].selected, true);
});

QUnit.test("lazy loading placeholder", assert => {
  const done = assert.async(2);

  const json = {
    questions: [{
      "type": "dropdown",
      "name": "q1",
      "choicesLazyLoadEnabled": true
    }]
  };
  const survey = new SurveyModel(json);
  survey.onChoicesLazyLoad.add((_, opt) => {
    setTimeout(() => { opt.setItems([], 0); }, 500);
  });

  const question = <QuestionDropdownModel>survey.getAllQuestions()[0];
  const dropdownListModel = question.dropdownListModel;
  const list: ListModel = dropdownListModel.popupModel.contentComponentData.model as ListModel;
  assert.equal(list.actions.length, 0);
  assert.equal(list.emptyMessage, "Loading...");
  assert.equal(question.choices.length, 0);

  question.dropdownListModel.popupModel.toggleVisibility();
  setTimeout(() => {
    assert.equal(list.actions.length, 0);
    assert.equal(list.emptyMessage, "No data to display");
    assert.equal(question.choices.length, 0);

    setTimeout(() => {

      done();
    }, 550);

    done();
  }, 550);
});