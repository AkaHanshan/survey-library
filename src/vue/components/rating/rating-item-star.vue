<template>
  <label :key="item.value" :class="question.getItemClass(item.itemValue)" 
  @mouseover="(e) => question.onItemMouseIn(item)" 
  @mouseleave="(e) => question.onItemMouseOut(item)">
    <input type="radio" class="sv-visuallyhidden" :name="question.name" :id="question.getInputId(index)"
      :value="item.value" :disabled="question.isInputReadOnly" @click="(e) => question.setValueFromClick(e.target.value)"
      :aria-required="question.ariaRequired" :aria-label="question.ariaLabel" :aria-invalid="question.ariaInvalid"
      :aria-describedby="question.ariaDescribedBy" />
    <sv-svg-icon :class="'sv-star'" :iconName="'icon-rating-star'" :size="'auto'" :title="item.text"></sv-svg-icon>
    <sv-svg-icon :class="'sv-star-2'" :iconName="'icon-rating-star-2'" :size="'auto'" :title="item.text"></sv-svg-icon>
  </label>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { RenderedRatingItem, QuestionRatingModel, Action } from "survey-core";
import { BaseVue, attachKey2click } from "../../base";


@Component
export class RatingItemStar extends BaseVue {
  @Prop() item: RenderedRatingItem;
  @Prop() question: QuestionRatingModel;
  @Prop() index: number;
  constructor() {
    super();
  }
  getModel() {
    return this.item;
  }
}

Vue.component("sv-rating-item-star", RatingItemStar);
export default RatingItemStar;
</script>
