<template>
  <div :class="{'input-group' : bootstrapStyling}">
    <!-- Calendar Button -->
    <span v-if="calendarButton" class="vdp-datepicker__calendar-button" :class="{'input-group-prepend' : bootstrapStyling}" @click="showCalendar" v-bind:style="{'cursor:not-allowed;' : disabled}">
      <span :class="{'input-group-text' : bootstrapStyling}">
        <i :class="calendarButtonIcon">
          {{ calendarButtonIconContent }}
          <span v-if="!calendarButtonIcon">&hellip;</span>
        </i>
      </span>
    </span>
    <!-- Input -->
    <input
      :type="inline ? 'hidden' : 'text'"
      :class="computedInputClass"
      :name="name"
      :ref="refName"
      :id="id"
      :value="formattedValue"
      :open-date="openDate"
      :placeholder="placeholder"
      :clear-button="clearButton"
      :disabled="disabled"
      :required="required"
      :readonly="!typeable"
      @click="showCalendar"
      @blur="inputBlurred"
      autocomplete="off">
    <!-- Clear Button -->
    <span v-if="clearButton && selectedDate" class="vdp-datepicker__clear-button" :class="{'input-group-append' : bootstrapStyling}" @click="clearDate()">
      <span :class="{'input-group-text' : bootstrapStyling}">
        <i :class="clearButtonIcon">
          <span v-if="!clearButtonIcon">&times;</span>
        </i>
      </span>
    </span>
    <slot name="afterDateInput"></slot>
  </div>
</template>
<script>
import { makeDateUtils } from '../utils/DateUtils'
export default {
  props: {
    selectedDate: Date,
    resetTypedDate: [Date],
    format: [String, Function],
    translation: Object,
    inline: Boolean,
    id: String,
    name: String,
    refName: String,
    openDate: Date,
    placeholder: String,
    inputClass: [String, Object, Array],
    clearButton: Boolean,
    clearButtonIcon: String,
    calendarButton: Boolean,
    calendarButtonIcon: String,
    calendarButtonIconContent: String,
    disabled: Boolean,
    disabledDates: Object,
    required: Boolean,
    typeable: Boolean,
    formatTypedDate: Function,
    bootstrapStyling: Boolean,
    useUtc: Boolean
  },
  data () {
    const constructedDateUtils = makeDateUtils(this.useUtc)
    return {
      input: null,
      typedDate: false,
      utils: constructedDateUtils
    }
  },
  computed: {
    formattedValue () {
      if (!this.selectedDate) {
        return null
      }
      if (this.typedDate) {
        let parsedTypedDate = new Date(this.formatTypedDate(this.typedDate))
        return typeof this.format === 'function'
          ? this.format(parsedTypedDate)
          : this.utils.formatDate(new Date(parsedTypedDate), this.format, this.translation)
      }
      return typeof this.format === 'function'
        ? this.format(this.selectedDate)
        : this.utils.formatDate(new Date(this.selectedDate), this.format, this.translation)
    },

    computedInputClass () {
      if (this.bootstrapStyling) {
        if (typeof this.inputClass === 'string') {
          return [this.inputClass, 'form-control'].join(' ')
        }
        return {'form-control': true, ...this.inputClass}
      }
      return this.inputClass
    }
  },
  watch: {
    resetTypedDate () {
      this.typedDate = false
    }
  },
  methods: {
    showCalendar () {
      this.$emit('showCalendar')
    },
    /**
     * nullify the typed date to defer to regular formatting
     * called once the input is blurred
     */
    inputBlurred () {
      if (this.typeable) {
        const parsedDate = Date.parse(this.getTypedDate(this.input.value))
        let date = new Date(parsedDate)
        if (!isNaN(parsedDate)) {
          if (this.disabledDates.to && date < this.disabledDates.to) {
            date = new Date(this.disabledDates.to)
            date.setDate(date.getDate() + 1)
          }
          if (this.disabledDates.from && date > this.disabledDates.from) {
            date = new Date(this.disabledDates.from)
          }
          this.typedDate = typeof this.format === 'function'
            ? this.format(date)
            : this.utils.formatDate(new Date(date), this.format, this.translation)
          this.$emit('typedDate', date)
        } else {
          this.clearDate()
          this.input.value = null
          this.typedDate = null
        }
      }

      this.$emit('closeCalendar')
    },
    /**
     * emit a clearDate event
     */
    clearDate () {
      this.$emit('clearDate')
    },
     /**
     * format Date with regular or custom function
     */
    getTypedDate (input) {
      let date = typeof this.formatTypedDate === 'function'
        ? this.formatTypedDate(input)
        : input
      return date
    }
  },
  mounted () {
    this.input = this.$el.querySelector('input')
  }
}
// eslint-disable-next-line
;
</script>
