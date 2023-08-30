import { s as safe_not_equal, q as construct_svelte_component, e as empty, i as insert_hydration, d as detach, D as compute_rest_props, E as get_current_component, P as getContext, G as setContext, o as onMount, R as onDestroy, u as assign, F as exclude_internal_props, p as binding_callbacks, r as create_slot, y as update_slot_base, z as get_all_dirty_from_scope, A as get_slot_changes, f as element, g as claim_element, h as children, j as attr } from "./scheduler.9514346f.js";
import { S as SvelteComponent, i as init, b as create_component, d as claim_component, m as mount_component, g as group_outros, t as transition_out, e as destroy_component, c as check_outros, a as transition_in } from "./index.6fa96164.js";
import { _ as __extends, a as __assign, m as __read, r as __spreadArray, M as MDCFoundation, c as classMap, g as get_spread_update, e as get_spread_object, f as forwardEventsBuilder, d as dispatch, S as SmuiElement, n as ponyfill, R as Ripple, b as classAdderBuilder } from "./Textfield.6c50af22.js";
/**
 * @license
 * Copyright 2020 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var KEY = {
  UNKNOWN: "Unknown",
  BACKSPACE: "Backspace",
  ENTER: "Enter",
  SPACEBAR: "Spacebar",
  PAGE_UP: "PageUp",
  PAGE_DOWN: "PageDown",
  END: "End",
  HOME: "Home",
  ARROW_LEFT: "ArrowLeft",
  ARROW_UP: "ArrowUp",
  ARROW_RIGHT: "ArrowRight",
  ARROW_DOWN: "ArrowDown",
  DELETE: "Delete",
  ESCAPE: "Escape",
  TAB: "Tab"
};
var normalizedKeys = /* @__PURE__ */ new Set();
normalizedKeys.add(KEY.BACKSPACE);
normalizedKeys.add(KEY.ENTER);
normalizedKeys.add(KEY.SPACEBAR);
normalizedKeys.add(KEY.PAGE_UP);
normalizedKeys.add(KEY.PAGE_DOWN);
normalizedKeys.add(KEY.END);
normalizedKeys.add(KEY.HOME);
normalizedKeys.add(KEY.ARROW_LEFT);
normalizedKeys.add(KEY.ARROW_UP);
normalizedKeys.add(KEY.ARROW_RIGHT);
normalizedKeys.add(KEY.ARROW_DOWN);
normalizedKeys.add(KEY.DELETE);
normalizedKeys.add(KEY.ESCAPE);
normalizedKeys.add(KEY.TAB);
var KEY_CODE = {
  BACKSPACE: 8,
  ENTER: 13,
  SPACEBAR: 32,
  PAGE_UP: 33,
  PAGE_DOWN: 34,
  END: 35,
  HOME: 36,
  ARROW_LEFT: 37,
  ARROW_UP: 38,
  ARROW_RIGHT: 39,
  ARROW_DOWN: 40,
  DELETE: 46,
  ESCAPE: 27,
  TAB: 9
};
var mappedKeyCodes = /* @__PURE__ */ new Map();
mappedKeyCodes.set(KEY_CODE.BACKSPACE, KEY.BACKSPACE);
mappedKeyCodes.set(KEY_CODE.ENTER, KEY.ENTER);
mappedKeyCodes.set(KEY_CODE.SPACEBAR, KEY.SPACEBAR);
mappedKeyCodes.set(KEY_CODE.PAGE_UP, KEY.PAGE_UP);
mappedKeyCodes.set(KEY_CODE.PAGE_DOWN, KEY.PAGE_DOWN);
mappedKeyCodes.set(KEY_CODE.END, KEY.END);
mappedKeyCodes.set(KEY_CODE.HOME, KEY.HOME);
mappedKeyCodes.set(KEY_CODE.ARROW_LEFT, KEY.ARROW_LEFT);
mappedKeyCodes.set(KEY_CODE.ARROW_UP, KEY.ARROW_UP);
mappedKeyCodes.set(KEY_CODE.ARROW_RIGHT, KEY.ARROW_RIGHT);
mappedKeyCodes.set(KEY_CODE.ARROW_DOWN, KEY.ARROW_DOWN);
mappedKeyCodes.set(KEY_CODE.DELETE, KEY.DELETE);
mappedKeyCodes.set(KEY_CODE.ESCAPE, KEY.ESCAPE);
mappedKeyCodes.set(KEY_CODE.TAB, KEY.TAB);
var navigationKeys = /* @__PURE__ */ new Set();
navigationKeys.add(KEY.PAGE_UP);
navigationKeys.add(KEY.PAGE_DOWN);
navigationKeys.add(KEY.END);
navigationKeys.add(KEY.HOME);
navigationKeys.add(KEY.ARROW_LEFT);
navigationKeys.add(KEY.ARROW_UP);
navigationKeys.add(KEY.ARROW_RIGHT);
navigationKeys.add(KEY.ARROW_DOWN);
function normalizeKey(evt) {
  var key = evt.key;
  if (normalizedKeys.has(key)) {
    return key;
  }
  var mappedKey = mappedKeyCodes.get(evt.keyCode);
  if (mappedKey) {
    return mappedKey;
  }
  return KEY.UNKNOWN;
}
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var _a, _b;
var cssClasses = {
  LIST_ITEM_ACTIVATED_CLASS: "mdc-list-item--activated",
  LIST_ITEM_CLASS: "mdc-list-item",
  LIST_ITEM_DISABLED_CLASS: "mdc-list-item--disabled",
  LIST_ITEM_SELECTED_CLASS: "mdc-list-item--selected",
  LIST_ITEM_TEXT_CLASS: "mdc-list-item__text",
  LIST_ITEM_PRIMARY_TEXT_CLASS: "mdc-list-item__primary-text",
  ROOT: "mdc-list"
};
_a = {}, _a["" + cssClasses.LIST_ITEM_ACTIVATED_CLASS] = "mdc-list-item--activated", _a["" + cssClasses.LIST_ITEM_CLASS] = "mdc-list-item", _a["" + cssClasses.LIST_ITEM_DISABLED_CLASS] = "mdc-list-item--disabled", _a["" + cssClasses.LIST_ITEM_SELECTED_CLASS] = "mdc-list-item--selected", _a["" + cssClasses.LIST_ITEM_PRIMARY_TEXT_CLASS] = "mdc-list-item__primary-text", _a["" + cssClasses.ROOT] = "mdc-list", _a;
var deprecatedClassNameMap = (_b = {}, _b["" + cssClasses.LIST_ITEM_ACTIVATED_CLASS] = "mdc-deprecated-list-item--activated", _b["" + cssClasses.LIST_ITEM_CLASS] = "mdc-deprecated-list-item", _b["" + cssClasses.LIST_ITEM_DISABLED_CLASS] = "mdc-deprecated-list-item--disabled", _b["" + cssClasses.LIST_ITEM_SELECTED_CLASS] = "mdc-deprecated-list-item--selected", _b["" + cssClasses.LIST_ITEM_TEXT_CLASS] = "mdc-deprecated-list-item__text", _b["" + cssClasses.LIST_ITEM_PRIMARY_TEXT_CLASS] = "mdc-deprecated-list-item__primary-text", _b["" + cssClasses.ROOT] = "mdc-deprecated-list", _b);
var strings = {
  ACTION_EVENT: "MDCList:action",
  SELECTION_CHANGE_EVENT: "MDCList:selectionChange",
  ARIA_CHECKED: "aria-checked",
  ARIA_CHECKED_CHECKBOX_SELECTOR: '[role="checkbox"][aria-checked="true"]',
  ARIA_CHECKED_RADIO_SELECTOR: '[role="radio"][aria-checked="true"]',
  ARIA_CURRENT: "aria-current",
  ARIA_DISABLED: "aria-disabled",
  ARIA_ORIENTATION: "aria-orientation",
  ARIA_ORIENTATION_HORIZONTAL: "horizontal",
  ARIA_ROLE_CHECKBOX_SELECTOR: '[role="checkbox"]',
  ARIA_SELECTED: "aria-selected",
  ARIA_INTERACTIVE_ROLES_SELECTOR: '[role="listbox"], [role="menu"]',
  ARIA_MULTI_SELECTABLE_SELECTOR: '[aria-multiselectable="true"]',
  CHECKBOX_RADIO_SELECTOR: 'input[type="checkbox"], input[type="radio"]',
  CHECKBOX_SELECTOR: 'input[type="checkbox"]',
  CHILD_ELEMENTS_TO_TOGGLE_TABINDEX: "\n    ." + cssClasses.LIST_ITEM_CLASS + " button:not(:disabled),\n    ." + cssClasses.LIST_ITEM_CLASS + " a,\n    ." + deprecatedClassNameMap[cssClasses.LIST_ITEM_CLASS] + " button:not(:disabled),\n    ." + deprecatedClassNameMap[cssClasses.LIST_ITEM_CLASS] + " a\n  ",
  DEPRECATED_SELECTOR: ".mdc-deprecated-list",
  FOCUSABLE_CHILD_ELEMENTS: "\n    ." + cssClasses.LIST_ITEM_CLASS + " button:not(:disabled),\n    ." + cssClasses.LIST_ITEM_CLASS + " a,\n    ." + cssClasses.LIST_ITEM_CLASS + ' input[type="radio"]:not(:disabled),\n    .' + cssClasses.LIST_ITEM_CLASS + ' input[type="checkbox"]:not(:disabled),\n    .' + deprecatedClassNameMap[cssClasses.LIST_ITEM_CLASS] + " button:not(:disabled),\n    ." + deprecatedClassNameMap[cssClasses.LIST_ITEM_CLASS] + " a,\n    ." + deprecatedClassNameMap[cssClasses.LIST_ITEM_CLASS] + ' input[type="radio"]:not(:disabled),\n    .' + deprecatedClassNameMap[cssClasses.LIST_ITEM_CLASS] + ' input[type="checkbox"]:not(:disabled)\n  ',
  RADIO_SELECTOR: 'input[type="radio"]',
  SELECTED_ITEM_SELECTOR: '[aria-selected="true"], [aria-current="true"]'
};
var numbers = {
  UNSET_INDEX: -1,
  TYPEAHEAD_BUFFER_CLEAR_TIMEOUT_MS: 300
};
/**
 * @license
 * Copyright 2020 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var ELEMENTS_KEY_ALLOWED_IN = ["input", "button", "textarea", "select"];
var preventDefaultEvent = function(evt) {
  var target = evt.target;
  if (!target) {
    return;
  }
  var tagName = ("" + target.tagName).toLowerCase();
  if (ELEMENTS_KEY_ALLOWED_IN.indexOf(tagName) === -1) {
    evt.preventDefault();
  }
};
/**
 * @license
 * Copyright 2020 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
function initState() {
  var state = {
    bufferClearTimeout: 0,
    currentFirstChar: "",
    sortedIndexCursor: 0,
    typeaheadBuffer: ""
  };
  return state;
}
function initSortedIndex(listItemCount, getPrimaryTextByItemIndex) {
  var sortedIndexByFirstChar = /* @__PURE__ */ new Map();
  for (var i = 0; i < listItemCount; i++) {
    var primaryText = getPrimaryTextByItemIndex(i).trim();
    if (!primaryText) {
      continue;
    }
    var firstChar = primaryText[0].toLowerCase();
    if (!sortedIndexByFirstChar.has(firstChar)) {
      sortedIndexByFirstChar.set(firstChar, []);
    }
    sortedIndexByFirstChar.get(firstChar).push({ text: primaryText.toLowerCase(), index: i });
  }
  sortedIndexByFirstChar.forEach(function(values) {
    values.sort(function(first, second) {
      return first.index - second.index;
    });
  });
  return sortedIndexByFirstChar;
}
function matchItem(opts, state) {
  var nextChar = opts.nextChar, focusItemAtIndex = opts.focusItemAtIndex, sortedIndexByFirstChar = opts.sortedIndexByFirstChar, focusedItemIndex = opts.focusedItemIndex, skipFocus = opts.skipFocus, isItemAtIndexDisabled = opts.isItemAtIndexDisabled;
  clearTimeout(state.bufferClearTimeout);
  state.bufferClearTimeout = setTimeout(function() {
    clearBuffer(state);
  }, numbers.TYPEAHEAD_BUFFER_CLEAR_TIMEOUT_MS);
  state.typeaheadBuffer = state.typeaheadBuffer + nextChar;
  var index;
  if (state.typeaheadBuffer.length === 1) {
    index = matchFirstChar(sortedIndexByFirstChar, focusedItemIndex, isItemAtIndexDisabled, state);
  } else {
    index = matchAllChars(sortedIndexByFirstChar, isItemAtIndexDisabled, state);
  }
  if (index !== -1 && !skipFocus) {
    focusItemAtIndex(index);
  }
  return index;
}
function matchFirstChar(sortedIndexByFirstChar, focusedItemIndex, isItemAtIndexDisabled, state) {
  var firstChar = state.typeaheadBuffer[0];
  var itemsMatchingFirstChar = sortedIndexByFirstChar.get(firstChar);
  if (!itemsMatchingFirstChar) {
    return -1;
  }
  if (firstChar === state.currentFirstChar && itemsMatchingFirstChar[state.sortedIndexCursor].index === focusedItemIndex) {
    state.sortedIndexCursor = (state.sortedIndexCursor + 1) % itemsMatchingFirstChar.length;
    var newIndex = itemsMatchingFirstChar[state.sortedIndexCursor].index;
    if (!isItemAtIndexDisabled(newIndex)) {
      return newIndex;
    }
  }
  state.currentFirstChar = firstChar;
  var newCursorPosition = -1;
  var cursorPosition;
  for (cursorPosition = 0; cursorPosition < itemsMatchingFirstChar.length; cursorPosition++) {
    if (!isItemAtIndexDisabled(itemsMatchingFirstChar[cursorPosition].index)) {
      newCursorPosition = cursorPosition;
      break;
    }
  }
  for (; cursorPosition < itemsMatchingFirstChar.length; cursorPosition++) {
    if (itemsMatchingFirstChar[cursorPosition].index > focusedItemIndex && !isItemAtIndexDisabled(itemsMatchingFirstChar[cursorPosition].index)) {
      newCursorPosition = cursorPosition;
      break;
    }
  }
  if (newCursorPosition !== -1) {
    state.sortedIndexCursor = newCursorPosition;
    return itemsMatchingFirstChar[state.sortedIndexCursor].index;
  }
  return -1;
}
function matchAllChars(sortedIndexByFirstChar, isItemAtIndexDisabled, state) {
  var firstChar = state.typeaheadBuffer[0];
  var itemsMatchingFirstChar = sortedIndexByFirstChar.get(firstChar);
  if (!itemsMatchingFirstChar) {
    return -1;
  }
  var startingItem = itemsMatchingFirstChar[state.sortedIndexCursor];
  if (startingItem.text.lastIndexOf(state.typeaheadBuffer, 0) === 0 && !isItemAtIndexDisabled(startingItem.index)) {
    return startingItem.index;
  }
  var cursorPosition = (state.sortedIndexCursor + 1) % itemsMatchingFirstChar.length;
  var nextCursorPosition = -1;
  while (cursorPosition !== state.sortedIndexCursor) {
    var currentItem = itemsMatchingFirstChar[cursorPosition];
    var matches = currentItem.text.lastIndexOf(state.typeaheadBuffer, 0) === 0;
    var isEnabled = !isItemAtIndexDisabled(currentItem.index);
    if (matches && isEnabled) {
      nextCursorPosition = cursorPosition;
      break;
    }
    cursorPosition = (cursorPosition + 1) % itemsMatchingFirstChar.length;
  }
  if (nextCursorPosition !== -1) {
    state.sortedIndexCursor = nextCursorPosition;
    return itemsMatchingFirstChar[state.sortedIndexCursor].index;
  }
  return -1;
}
function isTypingInProgress(state) {
  return state.typeaheadBuffer.length > 0;
}
function clearBuffer(state) {
  state.typeaheadBuffer = "";
}
function handleKeydown(opts, state) {
  var event = opts.event, isTargetListItem = opts.isTargetListItem, focusedItemIndex = opts.focusedItemIndex, focusItemAtIndex = opts.focusItemAtIndex, sortedIndexByFirstChar = opts.sortedIndexByFirstChar, isItemAtIndexDisabled = opts.isItemAtIndexDisabled;
  var isArrowLeft = normalizeKey(event) === "ArrowLeft";
  var isArrowUp = normalizeKey(event) === "ArrowUp";
  var isArrowRight = normalizeKey(event) === "ArrowRight";
  var isArrowDown = normalizeKey(event) === "ArrowDown";
  var isHome = normalizeKey(event) === "Home";
  var isEnd = normalizeKey(event) === "End";
  var isEnter = normalizeKey(event) === "Enter";
  var isSpace = normalizeKey(event) === "Spacebar";
  if (event.altKey || event.ctrlKey || event.metaKey || isArrowLeft || isArrowUp || isArrowRight || isArrowDown || isHome || isEnd || isEnter) {
    return -1;
  }
  var isCharacterKey = !isSpace && event.key.length === 1;
  if (isCharacterKey) {
    preventDefaultEvent(event);
    var matchItemOpts = {
      focusItemAtIndex,
      focusedItemIndex,
      nextChar: event.key.toLowerCase(),
      sortedIndexByFirstChar,
      skipFocus: false,
      isItemAtIndexDisabled
    };
    return matchItem(matchItemOpts, state);
  }
  if (!isSpace) {
    return -1;
  }
  if (isTargetListItem) {
    preventDefaultEvent(event);
  }
  var typeaheadOnListItem = isTargetListItem && isTypingInProgress(state);
  if (typeaheadOnListItem) {
    var matchItemOpts = {
      focusItemAtIndex,
      focusedItemIndex,
      nextChar: " ",
      sortedIndexByFirstChar,
      skipFocus: false,
      isItemAtIndexDisabled
    };
    return matchItem(matchItemOpts, state);
  }
  return -1;
}
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
function isNumberArray(selectedIndex) {
  return selectedIndex instanceof Array;
}
var handledModifierKeys = ["Alt", "Control", "Meta", "Shift"];
function createModifierChecker(event) {
  var eventModifiers = new Set(event ? handledModifierKeys.filter(function(m) {
    return event.getModifierState(m);
  }) : []);
  return function(modifiers) {
    return modifiers.every(function(m) {
      return eventModifiers.has(m);
    }) && modifiers.length === eventModifiers.size;
  };
}
var MDCListFoundation = (
  /** @class */
  function(_super) {
    __extends(MDCListFoundation2, _super);
    function MDCListFoundation2(adapter) {
      var _this = _super.call(this, __assign(__assign({}, MDCListFoundation2.defaultAdapter), adapter)) || this;
      _this.wrapFocus = false;
      _this.isVertical = true;
      _this.isSingleSelectionList = false;
      _this.areDisabledItemsFocusable = true;
      _this.selectedIndex = numbers.UNSET_INDEX;
      _this.focusedItemIndex = numbers.UNSET_INDEX;
      _this.useActivatedClass = false;
      _this.useSelectedAttr = false;
      _this.ariaCurrentAttrValue = null;
      _this.isCheckboxList = false;
      _this.isRadioList = false;
      _this.lastSelectedIndex = null;
      _this.hasTypeahead = false;
      _this.typeaheadState = initState();
      _this.sortedIndexByFirstChar = /* @__PURE__ */ new Map();
      return _this;
    }
    Object.defineProperty(MDCListFoundation2, "strings", {
      get: function() {
        return strings;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(MDCListFoundation2, "cssClasses", {
      get: function() {
        return cssClasses;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(MDCListFoundation2, "numbers", {
      get: function() {
        return numbers;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(MDCListFoundation2, "defaultAdapter", {
      get: function() {
        return {
          addClassForElementIndex: function() {
            return void 0;
          },
          focusItemAtIndex: function() {
            return void 0;
          },
          getAttributeForElementIndex: function() {
            return null;
          },
          getFocusedElementIndex: function() {
            return 0;
          },
          getListItemCount: function() {
            return 0;
          },
          hasCheckboxAtIndex: function() {
            return false;
          },
          hasRadioAtIndex: function() {
            return false;
          },
          isCheckboxCheckedAtIndex: function() {
            return false;
          },
          isFocusInsideList: function() {
            return false;
          },
          isRootFocused: function() {
            return false;
          },
          listItemAtIndexHasClass: function() {
            return false;
          },
          notifyAction: function() {
            return void 0;
          },
          notifySelectionChange: function() {
          },
          removeClassForElementIndex: function() {
            return void 0;
          },
          setAttributeForElementIndex: function() {
            return void 0;
          },
          setCheckedCheckboxOrRadioAtIndex: function() {
            return void 0;
          },
          setTabIndexForListItemChildren: function() {
            return void 0;
          },
          getPrimaryTextAtIndex: function() {
            return "";
          }
        };
      },
      enumerable: false,
      configurable: true
    });
    MDCListFoundation2.prototype.layout = function() {
      if (this.adapter.getListItemCount() === 0) {
        return;
      }
      if (this.adapter.hasCheckboxAtIndex(0)) {
        this.isCheckboxList = true;
      } else if (this.adapter.hasRadioAtIndex(0)) {
        this.isRadioList = true;
      } else {
        this.maybeInitializeSingleSelection();
      }
      if (this.hasTypeahead) {
        this.sortedIndexByFirstChar = this.typeaheadInitSortedIndex();
      }
    };
    MDCListFoundation2.prototype.getFocusedItemIndex = function() {
      return this.focusedItemIndex;
    };
    MDCListFoundation2.prototype.setWrapFocus = function(value) {
      this.wrapFocus = value;
    };
    MDCListFoundation2.prototype.setVerticalOrientation = function(value) {
      this.isVertical = value;
    };
    MDCListFoundation2.prototype.setSingleSelection = function(value) {
      this.isSingleSelectionList = value;
      if (value) {
        this.maybeInitializeSingleSelection();
        this.selectedIndex = this.getSelectedIndexFromDOM();
      }
    };
    MDCListFoundation2.prototype.setDisabledItemsFocusable = function(value) {
      this.areDisabledItemsFocusable = value;
    };
    MDCListFoundation2.prototype.maybeInitializeSingleSelection = function() {
      var selectedItemIndex = this.getSelectedIndexFromDOM();
      if (selectedItemIndex === numbers.UNSET_INDEX)
        return;
      var hasActivatedClass = this.adapter.listItemAtIndexHasClass(selectedItemIndex, cssClasses.LIST_ITEM_ACTIVATED_CLASS);
      if (hasActivatedClass) {
        this.setUseActivatedClass(true);
      }
      this.isSingleSelectionList = true;
      this.selectedIndex = selectedItemIndex;
    };
    MDCListFoundation2.prototype.getSelectedIndexFromDOM = function() {
      var selectedIndex = numbers.UNSET_INDEX;
      var listItemsCount = this.adapter.getListItemCount();
      for (var i = 0; i < listItemsCount; i++) {
        var hasSelectedClass = this.adapter.listItemAtIndexHasClass(i, cssClasses.LIST_ITEM_SELECTED_CLASS);
        var hasActivatedClass = this.adapter.listItemAtIndexHasClass(i, cssClasses.LIST_ITEM_ACTIVATED_CLASS);
        if (!(hasSelectedClass || hasActivatedClass)) {
          continue;
        }
        selectedIndex = i;
        break;
      }
      return selectedIndex;
    };
    MDCListFoundation2.prototype.setHasTypeahead = function(hasTypeahead) {
      this.hasTypeahead = hasTypeahead;
      if (hasTypeahead) {
        this.sortedIndexByFirstChar = this.typeaheadInitSortedIndex();
      }
    };
    MDCListFoundation2.prototype.isTypeaheadInProgress = function() {
      return this.hasTypeahead && isTypingInProgress(this.typeaheadState);
    };
    MDCListFoundation2.prototype.setUseActivatedClass = function(useActivated) {
      this.useActivatedClass = useActivated;
    };
    MDCListFoundation2.prototype.setUseSelectedAttribute = function(useSelected) {
      this.useSelectedAttr = useSelected;
    };
    MDCListFoundation2.prototype.getSelectedIndex = function() {
      return this.selectedIndex;
    };
    MDCListFoundation2.prototype.setSelectedIndex = function(index, options) {
      if (options === void 0) {
        options = {};
      }
      if (!this.isIndexValid(index)) {
        return;
      }
      if (this.isCheckboxList) {
        this.setCheckboxAtIndex(index, options);
      } else if (this.isRadioList) {
        this.setRadioAtIndex(index, options);
      } else {
        this.setSingleSelectionAtIndex(index, options);
      }
    };
    MDCListFoundation2.prototype.handleFocusIn = function(listItemIndex) {
      if (listItemIndex >= 0) {
        this.focusedItemIndex = listItemIndex;
        this.adapter.setAttributeForElementIndex(listItemIndex, "tabindex", "0");
        this.adapter.setTabIndexForListItemChildren(listItemIndex, "0");
      }
    };
    MDCListFoundation2.prototype.handleFocusOut = function(listItemIndex) {
      var _this = this;
      if (listItemIndex >= 0) {
        this.adapter.setAttributeForElementIndex(listItemIndex, "tabindex", "-1");
        this.adapter.setTabIndexForListItemChildren(listItemIndex, "-1");
      }
      setTimeout(function() {
        if (!_this.adapter.isFocusInsideList()) {
          _this.setTabindexToFirstSelectedOrFocusedItem();
        }
      }, 0);
    };
    MDCListFoundation2.prototype.isIndexDisabled = function(index) {
      return this.adapter.listItemAtIndexHasClass(index, cssClasses.LIST_ITEM_DISABLED_CLASS);
    };
    MDCListFoundation2.prototype.handleKeydown = function(event, isRootListItem, listItemIndex) {
      var _this = this;
      var _a2;
      var isArrowLeft = normalizeKey(event) === "ArrowLeft";
      var isArrowUp = normalizeKey(event) === "ArrowUp";
      var isArrowRight = normalizeKey(event) === "ArrowRight";
      var isArrowDown = normalizeKey(event) === "ArrowDown";
      var isHome = normalizeKey(event) === "Home";
      var isEnd = normalizeKey(event) === "End";
      var isEnter = normalizeKey(event) === "Enter";
      var isSpace = normalizeKey(event) === "Spacebar";
      var isForward = this.isVertical && isArrowDown || !this.isVertical && isArrowRight;
      var isBack = this.isVertical && isArrowUp || !this.isVertical && isArrowLeft;
      var isLetterA = event.key === "A" || event.key === "a";
      var eventHasModifiers = createModifierChecker(event);
      if (this.adapter.isRootFocused()) {
        if ((isBack || isEnd) && eventHasModifiers([])) {
          event.preventDefault();
          this.focusLastElement();
        } else if ((isForward || isHome) && eventHasModifiers([])) {
          event.preventDefault();
          this.focusFirstElement();
        } else if (isBack && eventHasModifiers(["Shift"]) && this.isCheckboxList) {
          event.preventDefault();
          var focusedIndex = this.focusLastElement();
          if (focusedIndex !== -1) {
            this.setSelectedIndexOnAction(focusedIndex, false);
          }
        } else if (isForward && eventHasModifiers(["Shift"]) && this.isCheckboxList) {
          event.preventDefault();
          var focusedIndex = this.focusFirstElement();
          if (focusedIndex !== -1) {
            this.setSelectedIndexOnAction(focusedIndex, false);
          }
        }
        if (this.hasTypeahead) {
          var handleKeydownOpts = {
            event,
            focusItemAtIndex: function(index) {
              _this.focusItemAtIndex(index);
            },
            focusedItemIndex: -1,
            isTargetListItem: isRootListItem,
            sortedIndexByFirstChar: this.sortedIndexByFirstChar,
            isItemAtIndexDisabled: function(index) {
              return _this.isIndexDisabled(index);
            }
          };
          handleKeydown(handleKeydownOpts, this.typeaheadState);
        }
        return;
      }
      var currentIndex = this.adapter.getFocusedElementIndex();
      if (currentIndex === -1) {
        currentIndex = listItemIndex;
        if (currentIndex < 0) {
          return;
        }
      }
      if (isForward && eventHasModifiers([])) {
        preventDefaultEvent(event);
        this.focusNextElement(currentIndex);
      } else if (isBack && eventHasModifiers([])) {
        preventDefaultEvent(event);
        this.focusPrevElement(currentIndex);
      } else if (isForward && eventHasModifiers(["Shift"]) && this.isCheckboxList) {
        preventDefaultEvent(event);
        var focusedIndex = this.focusNextElement(currentIndex);
        if (focusedIndex !== -1) {
          this.setSelectedIndexOnAction(focusedIndex, false);
        }
      } else if (isBack && eventHasModifiers(["Shift"]) && this.isCheckboxList) {
        preventDefaultEvent(event);
        var focusedIndex = this.focusPrevElement(currentIndex);
        if (focusedIndex !== -1) {
          this.setSelectedIndexOnAction(focusedIndex, false);
        }
      } else if (isHome && eventHasModifiers([])) {
        preventDefaultEvent(event);
        this.focusFirstElement();
      } else if (isEnd && eventHasModifiers([])) {
        preventDefaultEvent(event);
        this.focusLastElement();
      } else if (isHome && eventHasModifiers(["Control", "Shift"]) && this.isCheckboxList) {
        preventDefaultEvent(event);
        if (this.isIndexDisabled(currentIndex)) {
          return;
        }
        this.focusFirstElement();
        this.toggleCheckboxRange(0, currentIndex, currentIndex);
      } else if (isEnd && eventHasModifiers(["Control", "Shift"]) && this.isCheckboxList) {
        preventDefaultEvent(event);
        if (this.isIndexDisabled(currentIndex)) {
          return;
        }
        this.focusLastElement();
        this.toggleCheckboxRange(currentIndex, this.adapter.getListItemCount() - 1, currentIndex);
      } else if (isLetterA && eventHasModifiers(["Control"]) && this.isCheckboxList) {
        event.preventDefault();
        this.checkboxListToggleAll(this.selectedIndex === numbers.UNSET_INDEX ? [] : this.selectedIndex, true);
      } else if ((isEnter || isSpace) && eventHasModifiers([])) {
        if (isRootListItem) {
          var target = event.target;
          if (target && target.tagName === "A" && isEnter) {
            return;
          }
          preventDefaultEvent(event);
          if (this.isIndexDisabled(currentIndex)) {
            return;
          }
          if (!this.isTypeaheadInProgress()) {
            if (this.isSelectableList()) {
              this.setSelectedIndexOnAction(currentIndex, false);
            }
            this.adapter.notifyAction(currentIndex);
          }
        }
      } else if ((isEnter || isSpace) && eventHasModifiers(["Shift"]) && this.isCheckboxList) {
        var target = event.target;
        if (target && target.tagName === "A" && isEnter) {
          return;
        }
        preventDefaultEvent(event);
        if (this.isIndexDisabled(currentIndex)) {
          return;
        }
        if (!this.isTypeaheadInProgress()) {
          this.toggleCheckboxRange((_a2 = this.lastSelectedIndex) !== null && _a2 !== void 0 ? _a2 : currentIndex, currentIndex, currentIndex);
          this.adapter.notifyAction(currentIndex);
        }
      }
      if (this.hasTypeahead) {
        var handleKeydownOpts = {
          event,
          focusItemAtIndex: function(index) {
            _this.focusItemAtIndex(index);
          },
          focusedItemIndex: this.focusedItemIndex,
          isTargetListItem: isRootListItem,
          sortedIndexByFirstChar: this.sortedIndexByFirstChar,
          isItemAtIndexDisabled: function(index) {
            return _this.isIndexDisabled(index);
          }
        };
        handleKeydown(handleKeydownOpts, this.typeaheadState);
      }
    };
    MDCListFoundation2.prototype.handleClick = function(index, isCheckboxAlreadyUpdatedInAdapter, event) {
      var _a2;
      var eventHasModifiers = createModifierChecker(event);
      if (index === numbers.UNSET_INDEX) {
        return;
      }
      if (this.isIndexDisabled(index)) {
        return;
      }
      if (eventHasModifiers([])) {
        if (this.isSelectableList()) {
          this.setSelectedIndexOnAction(index, isCheckboxAlreadyUpdatedInAdapter);
        }
        this.adapter.notifyAction(index);
      } else if (this.isCheckboxList && eventHasModifiers(["Shift"])) {
        this.toggleCheckboxRange((_a2 = this.lastSelectedIndex) !== null && _a2 !== void 0 ? _a2 : index, index, index);
        this.adapter.notifyAction(index);
      }
    };
    MDCListFoundation2.prototype.focusNextElement = function(index) {
      var count = this.adapter.getListItemCount();
      var nextIndex = index;
      var firstChecked = null;
      do {
        nextIndex++;
        if (nextIndex >= count) {
          if (this.wrapFocus) {
            nextIndex = 0;
          } else {
            return index;
          }
        }
        if (nextIndex === firstChecked) {
          return -1;
        }
        firstChecked = firstChecked !== null && firstChecked !== void 0 ? firstChecked : nextIndex;
      } while (!this.areDisabledItemsFocusable && this.isIndexDisabled(nextIndex));
      this.focusItemAtIndex(nextIndex);
      return nextIndex;
    };
    MDCListFoundation2.prototype.focusPrevElement = function(index) {
      var count = this.adapter.getListItemCount();
      var prevIndex = index;
      var firstChecked = null;
      do {
        prevIndex--;
        if (prevIndex < 0) {
          if (this.wrapFocus) {
            prevIndex = count - 1;
          } else {
            return index;
          }
        }
        if (prevIndex === firstChecked) {
          return -1;
        }
        firstChecked = firstChecked !== null && firstChecked !== void 0 ? firstChecked : prevIndex;
      } while (!this.areDisabledItemsFocusable && this.isIndexDisabled(prevIndex));
      this.focusItemAtIndex(prevIndex);
      return prevIndex;
    };
    MDCListFoundation2.prototype.focusFirstElement = function() {
      return this.focusNextElement(-1);
    };
    MDCListFoundation2.prototype.focusLastElement = function() {
      return this.focusPrevElement(this.adapter.getListItemCount());
    };
    MDCListFoundation2.prototype.focusInitialElement = function() {
      var initialIndex = this.getFirstSelectedOrFocusedItemIndex();
      this.focusItemAtIndex(initialIndex);
      return initialIndex;
    };
    MDCListFoundation2.prototype.setEnabled = function(itemIndex, isEnabled) {
      if (!this.isIndexValid(itemIndex, false)) {
        return;
      }
      if (isEnabled) {
        this.adapter.removeClassForElementIndex(itemIndex, cssClasses.LIST_ITEM_DISABLED_CLASS);
        this.adapter.setAttributeForElementIndex(itemIndex, strings.ARIA_DISABLED, "false");
      } else {
        this.adapter.addClassForElementIndex(itemIndex, cssClasses.LIST_ITEM_DISABLED_CLASS);
        this.adapter.setAttributeForElementIndex(itemIndex, strings.ARIA_DISABLED, "true");
      }
    };
    MDCListFoundation2.prototype.setSingleSelectionAtIndex = function(index, options) {
      if (options === void 0) {
        options = {};
      }
      if (this.selectedIndex === index && !options.forceUpdate) {
        return;
      }
      var selectedClassName = cssClasses.LIST_ITEM_SELECTED_CLASS;
      if (this.useActivatedClass) {
        selectedClassName = cssClasses.LIST_ITEM_ACTIVATED_CLASS;
      }
      if (this.selectedIndex !== numbers.UNSET_INDEX) {
        this.adapter.removeClassForElementIndex(this.selectedIndex, selectedClassName);
      }
      this.setAriaForSingleSelectionAtIndex(index);
      this.setTabindexAtIndex(index);
      if (index !== numbers.UNSET_INDEX) {
        this.adapter.addClassForElementIndex(index, selectedClassName);
      }
      this.selectedIndex = index;
      if (options.isUserInteraction && !options.forceUpdate) {
        this.adapter.notifySelectionChange([index]);
      }
    };
    MDCListFoundation2.prototype.setAriaForSingleSelectionAtIndex = function(index) {
      if (this.selectedIndex === numbers.UNSET_INDEX) {
        this.ariaCurrentAttrValue = this.adapter.getAttributeForElementIndex(index, strings.ARIA_CURRENT);
      }
      var isAriaCurrent = this.ariaCurrentAttrValue !== null;
      var ariaAttribute = isAriaCurrent ? strings.ARIA_CURRENT : strings.ARIA_SELECTED;
      if (this.selectedIndex !== numbers.UNSET_INDEX) {
        this.adapter.setAttributeForElementIndex(this.selectedIndex, ariaAttribute, "false");
      }
      if (index !== numbers.UNSET_INDEX) {
        var ariaAttributeValue = isAriaCurrent ? this.ariaCurrentAttrValue : "true";
        this.adapter.setAttributeForElementIndex(index, ariaAttribute, ariaAttributeValue);
      }
    };
    MDCListFoundation2.prototype.getSelectionAttribute = function() {
      return this.useSelectedAttr ? strings.ARIA_SELECTED : strings.ARIA_CHECKED;
    };
    MDCListFoundation2.prototype.setRadioAtIndex = function(index, options) {
      if (options === void 0) {
        options = {};
      }
      var selectionAttribute = this.getSelectionAttribute();
      this.adapter.setCheckedCheckboxOrRadioAtIndex(index, true);
      if (this.selectedIndex === index && !options.forceUpdate) {
        return;
      }
      if (this.selectedIndex !== numbers.UNSET_INDEX) {
        this.adapter.setAttributeForElementIndex(this.selectedIndex, selectionAttribute, "false");
      }
      this.adapter.setAttributeForElementIndex(index, selectionAttribute, "true");
      this.selectedIndex = index;
      if (options.isUserInteraction && !options.forceUpdate) {
        this.adapter.notifySelectionChange([index]);
      }
    };
    MDCListFoundation2.prototype.setCheckboxAtIndex = function(index, options) {
      if (options === void 0) {
        options = {};
      }
      var currentIndex = this.selectedIndex;
      var currentlySelected = options.isUserInteraction ? new Set(currentIndex === numbers.UNSET_INDEX ? [] : currentIndex) : null;
      var selectionAttribute = this.getSelectionAttribute();
      var changedIndices = [];
      for (var i = 0; i < this.adapter.getListItemCount(); i++) {
        var previousIsChecked = currentlySelected === null || currentlySelected === void 0 ? void 0 : currentlySelected.has(i);
        var newIsChecked = index.indexOf(i) >= 0;
        if (newIsChecked !== previousIsChecked) {
          changedIndices.push(i);
        }
        this.adapter.setCheckedCheckboxOrRadioAtIndex(i, newIsChecked);
        this.adapter.setAttributeForElementIndex(i, selectionAttribute, newIsChecked ? "true" : "false");
      }
      this.selectedIndex = index;
      if (options.isUserInteraction && changedIndices.length) {
        this.adapter.notifySelectionChange(changedIndices);
      }
    };
    MDCListFoundation2.prototype.toggleCheckboxRange = function(fromIndex, toIndex, toggleIndex) {
      this.lastSelectedIndex = toggleIndex;
      var currentlySelected = new Set(this.selectedIndex === numbers.UNSET_INDEX ? [] : this.selectedIndex);
      var newIsChecked = !(currentlySelected === null || currentlySelected === void 0 ? void 0 : currentlySelected.has(toggleIndex));
      var _a2 = __read([fromIndex, toIndex].sort(), 2), startIndex = _a2[0], endIndex = _a2[1];
      var selectionAttribute = this.getSelectionAttribute();
      var changedIndices = [];
      for (var i = startIndex; i <= endIndex; i++) {
        if (this.isIndexDisabled(i)) {
          continue;
        }
        var previousIsChecked = currentlySelected.has(i);
        if (newIsChecked !== previousIsChecked) {
          changedIndices.push(i);
          this.adapter.setCheckedCheckboxOrRadioAtIndex(i, newIsChecked);
          this.adapter.setAttributeForElementIndex(i, selectionAttribute, "" + newIsChecked);
          if (newIsChecked) {
            currentlySelected.add(i);
          } else {
            currentlySelected.delete(i);
          }
        }
      }
      if (changedIndices.length) {
        this.selectedIndex = __spreadArray([], __read(currentlySelected));
        this.adapter.notifySelectionChange(changedIndices);
      }
    };
    MDCListFoundation2.prototype.setTabindexAtIndex = function(index) {
      if (this.focusedItemIndex === numbers.UNSET_INDEX && index !== 0) {
        this.adapter.setAttributeForElementIndex(0, "tabindex", "-1");
      } else if (this.focusedItemIndex >= 0 && this.focusedItemIndex !== index) {
        this.adapter.setAttributeForElementIndex(this.focusedItemIndex, "tabindex", "-1");
      }
      if (!(this.selectedIndex instanceof Array) && this.selectedIndex !== index) {
        this.adapter.setAttributeForElementIndex(this.selectedIndex, "tabindex", "-1");
      }
      if (index !== numbers.UNSET_INDEX) {
        this.adapter.setAttributeForElementIndex(index, "tabindex", "0");
      }
    };
    MDCListFoundation2.prototype.isSelectableList = function() {
      return this.isSingleSelectionList || this.isCheckboxList || this.isRadioList;
    };
    MDCListFoundation2.prototype.setTabindexToFirstSelectedOrFocusedItem = function() {
      var targetIndex = this.getFirstSelectedOrFocusedItemIndex();
      this.setTabindexAtIndex(targetIndex);
    };
    MDCListFoundation2.prototype.getFirstSelectedOrFocusedItemIndex = function() {
      if (!this.isSelectableList()) {
        return Math.max(this.focusedItemIndex, 0);
      }
      if (typeof this.selectedIndex === "number" && this.selectedIndex !== numbers.UNSET_INDEX) {
        return this.selectedIndex;
      }
      if (isNumberArray(this.selectedIndex) && this.selectedIndex.length > 0) {
        return this.selectedIndex.reduce(function(minIndex, currentIndex) {
          return Math.min(minIndex, currentIndex);
        });
      }
      return 0;
    };
    MDCListFoundation2.prototype.isIndexValid = function(index, validateListType) {
      var _this = this;
      if (validateListType === void 0) {
        validateListType = true;
      }
      if (index instanceof Array) {
        if (!this.isCheckboxList && validateListType) {
          throw new Error("MDCListFoundation: Array of index is only supported for checkbox based list");
        }
        if (index.length === 0) {
          return true;
        } else {
          return index.some(function(i) {
            return _this.isIndexInRange(i);
          });
        }
      } else if (typeof index === "number") {
        if (this.isCheckboxList && validateListType) {
          throw new Error("MDCListFoundation: Expected array of index for checkbox based list but got number: " + index);
        }
        return this.isIndexInRange(index) || this.isSingleSelectionList && index === numbers.UNSET_INDEX;
      } else {
        return false;
      }
    };
    MDCListFoundation2.prototype.isIndexInRange = function(index) {
      var listSize = this.adapter.getListItemCount();
      return index >= 0 && index < listSize;
    };
    MDCListFoundation2.prototype.setSelectedIndexOnAction = function(index, isCheckboxAlreadyUpdatedInAdapter) {
      this.lastSelectedIndex = index;
      if (this.isCheckboxList) {
        this.toggleCheckboxAtIndex(index, isCheckboxAlreadyUpdatedInAdapter);
        this.adapter.notifySelectionChange([index]);
      } else {
        this.setSelectedIndex(index, { isUserInteraction: true });
      }
    };
    MDCListFoundation2.prototype.toggleCheckboxAtIndex = function(index, isCheckboxAlreadyUpdatedInAdapter) {
      var selectionAttribute = this.getSelectionAttribute();
      var adapterIsChecked = this.adapter.isCheckboxCheckedAtIndex(index);
      var newCheckedValue;
      if (isCheckboxAlreadyUpdatedInAdapter) {
        newCheckedValue = adapterIsChecked;
      } else {
        newCheckedValue = !adapterIsChecked;
        this.adapter.setCheckedCheckboxOrRadioAtIndex(index, newCheckedValue);
      }
      this.adapter.setAttributeForElementIndex(index, selectionAttribute, newCheckedValue ? "true" : "false");
      var selectedIndexes = this.selectedIndex === numbers.UNSET_INDEX ? [] : this.selectedIndex.slice();
      if (newCheckedValue) {
        selectedIndexes.push(index);
      } else {
        selectedIndexes = selectedIndexes.filter(function(i) {
          return i !== index;
        });
      }
      this.selectedIndex = selectedIndexes;
    };
    MDCListFoundation2.prototype.focusItemAtIndex = function(index) {
      this.adapter.focusItemAtIndex(index);
      this.focusedItemIndex = index;
    };
    MDCListFoundation2.prototype.checkboxListToggleAll = function(currentlySelectedIndexes, isUserInteraction) {
      var count = this.adapter.getListItemCount();
      if (currentlySelectedIndexes.length === count) {
        this.setCheckboxAtIndex([], { isUserInteraction });
      } else {
        var allIndexes = [];
        for (var i = 0; i < count; i++) {
          if (!this.isIndexDisabled(i) || currentlySelectedIndexes.indexOf(i) > -1) {
            allIndexes.push(i);
          }
        }
        this.setCheckboxAtIndex(allIndexes, { isUserInteraction });
      }
    };
    MDCListFoundation2.prototype.typeaheadMatchItem = function(nextChar, startingIndex, skipFocus) {
      var _this = this;
      if (skipFocus === void 0) {
        skipFocus = false;
      }
      var opts = {
        focusItemAtIndex: function(index) {
          _this.focusItemAtIndex(index);
        },
        focusedItemIndex: startingIndex ? startingIndex : this.focusedItemIndex,
        nextChar,
        sortedIndexByFirstChar: this.sortedIndexByFirstChar,
        skipFocus,
        isItemAtIndexDisabled: function(index) {
          return _this.isIndexDisabled(index);
        }
      };
      return matchItem(opts, this.typeaheadState);
    };
    MDCListFoundation2.prototype.typeaheadInitSortedIndex = function() {
      return initSortedIndex(this.adapter.getListItemCount(), this.adapter.getPrimaryTextAtIndex);
    };
    MDCListFoundation2.prototype.clearTypeaheadBuffer = function() {
      clearBuffer(this.typeaheadState);
    };
    return MDCListFoundation2;
  }(MDCFoundation)
);
function create_default_slot$1(ctx) {
  let current;
  const default_slot_template = (
    /*#slots*/
    ctx[42].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[44],
    null
  );
  return {
    c() {
      if (default_slot)
        default_slot.c();
    },
    l(nodes) {
      if (default_slot)
        default_slot.l(nodes);
    },
    m(target, anchor) {
      if (default_slot) {
        default_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty[1] & /*$$scope*/
        8192)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[44],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[44]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[44],
              dirty,
              null
            ),
            null
          );
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (default_slot)
        default_slot.d(detaching);
    }
  };
}
function create_fragment$1(ctx) {
  let switch_instance;
  let switch_instance_anchor;
  let current;
  const switch_instance_spread_levels = [
    { tag: (
      /*tag*/
      ctx[13]
    ) },
    {
      use: [
        /*forwardEvents*/
        ctx[16],
        .../*use*/
        ctx[0]
      ]
    },
    {
      class: classMap({
        [
          /*className*/
          ctx[1]
        ]: true,
        "mdc-deprecated-list": true,
        "mdc-deprecated-list--non-interactive": (
          /*nonInteractive*/
          ctx[2]
        ),
        "mdc-deprecated-list--dense": (
          /*dense*/
          ctx[3]
        ),
        "mdc-deprecated-list--textual-list": (
          /*textualList*/
          ctx[4]
        ),
        "mdc-deprecated-list--avatar-list": (
          /*avatarList*/
          ctx[5] || /*selectionDialog*/
          ctx[17]
        ),
        "mdc-deprecated-list--icon-list": (
          /*iconList*/
          ctx[6]
        ),
        "mdc-deprecated-list--image-list": (
          /*imageList*/
          ctx[7]
        ),
        "mdc-deprecated-list--thumbnail-list": (
          /*thumbnailList*/
          ctx[8]
        ),
        "mdc-deprecated-list--video-list": (
          /*videoList*/
          ctx[9]
        ),
        "mdc-deprecated-list--two-line": (
          /*twoLine*/
          ctx[10]
        ),
        "smui-list--three-line": (
          /*threeLine*/
          ctx[11] && !/*twoLine*/
          ctx[10]
        )
      })
    },
    { role: (
      /*role*/
      ctx[15]
    ) },
    /*$$restProps*/
    ctx[25]
  ];
  var switch_value = (
    /*component*/
    ctx[12]
  );
  function switch_props(ctx2) {
    let switch_instance_props = {
      $$slots: { default: [create_default_slot$1] },
      $$scope: { ctx: ctx2 }
    };
    for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
      switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    }
    return { props: switch_instance_props };
  }
  if (switch_value) {
    switch_instance = construct_svelte_component(switch_value, switch_props(ctx));
    ctx[43](switch_instance);
    switch_instance.$on(
      "keydown",
      /*handleKeydown*/
      ctx[20]
    );
    switch_instance.$on(
      "focusin",
      /*handleFocusin*/
      ctx[21]
    );
    switch_instance.$on(
      "focusout",
      /*handleFocusout*/
      ctx[22]
    );
    switch_instance.$on(
      "click",
      /*handleClick*/
      ctx[23]
    );
    switch_instance.$on(
      "SMUIListItem:mount",
      /*handleItemMount*/
      ctx[18]
    );
    switch_instance.$on(
      "SMUIListItem:unmount",
      /*handleItemUnmount*/
      ctx[19]
    );
    switch_instance.$on(
      "SMUI:action",
      /*handleAction*/
      ctx[24]
    );
  }
  return {
    c() {
      if (switch_instance)
        create_component(switch_instance.$$.fragment);
      switch_instance_anchor = empty();
    },
    l(nodes) {
      if (switch_instance)
        claim_component(switch_instance.$$.fragment, nodes);
      switch_instance_anchor = empty();
    },
    m(target, anchor) {
      if (switch_instance)
        mount_component(switch_instance, target, anchor);
      insert_hydration(target, switch_instance_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const switch_instance_changes = dirty[0] & /*tag, forwardEvents, use, className, nonInteractive, dense, textualList, avatarList, selectionDialog, iconList, imageList, thumbnailList, videoList, twoLine, threeLine, role, $$restProps*/
      33796095 ? get_spread_update(switch_instance_spread_levels, [
        dirty[0] & /*tag*/
        8192 && { tag: (
          /*tag*/
          ctx2[13]
        ) },
        dirty[0] & /*forwardEvents, use*/
        65537 && {
          use: [
            /*forwardEvents*/
            ctx2[16],
            .../*use*/
            ctx2[0]
          ]
        },
        dirty[0] & /*className, nonInteractive, dense, textualList, avatarList, selectionDialog, iconList, imageList, thumbnailList, videoList, twoLine, threeLine*/
        135166 && {
          class: classMap({
            [
              /*className*/
              ctx2[1]
            ]: true,
            "mdc-deprecated-list": true,
            "mdc-deprecated-list--non-interactive": (
              /*nonInteractive*/
              ctx2[2]
            ),
            "mdc-deprecated-list--dense": (
              /*dense*/
              ctx2[3]
            ),
            "mdc-deprecated-list--textual-list": (
              /*textualList*/
              ctx2[4]
            ),
            "mdc-deprecated-list--avatar-list": (
              /*avatarList*/
              ctx2[5] || /*selectionDialog*/
              ctx2[17]
            ),
            "mdc-deprecated-list--icon-list": (
              /*iconList*/
              ctx2[6]
            ),
            "mdc-deprecated-list--image-list": (
              /*imageList*/
              ctx2[7]
            ),
            "mdc-deprecated-list--thumbnail-list": (
              /*thumbnailList*/
              ctx2[8]
            ),
            "mdc-deprecated-list--video-list": (
              /*videoList*/
              ctx2[9]
            ),
            "mdc-deprecated-list--two-line": (
              /*twoLine*/
              ctx2[10]
            ),
            "smui-list--three-line": (
              /*threeLine*/
              ctx2[11] && !/*twoLine*/
              ctx2[10]
            )
          })
        },
        dirty[0] & /*role*/
        32768 && { role: (
          /*role*/
          ctx2[15]
        ) },
        dirty[0] & /*$$restProps*/
        33554432 && get_spread_object(
          /*$$restProps*/
          ctx2[25]
        )
      ]) : {};
      if (dirty[1] & /*$$scope*/
      8192) {
        switch_instance_changes.$$scope = { dirty, ctx: ctx2 };
      }
      if (dirty[0] & /*component*/
      4096 && switch_value !== (switch_value = /*component*/
      ctx2[12])) {
        if (switch_instance) {
          group_outros();
          const old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1);
          });
          check_outros();
        }
        if (switch_value) {
          switch_instance = construct_svelte_component(switch_value, switch_props(ctx2));
          ctx2[43](switch_instance);
          switch_instance.$on(
            "keydown",
            /*handleKeydown*/
            ctx2[20]
          );
          switch_instance.$on(
            "focusin",
            /*handleFocusin*/
            ctx2[21]
          );
          switch_instance.$on(
            "focusout",
            /*handleFocusout*/
            ctx2[22]
          );
          switch_instance.$on(
            "click",
            /*handleClick*/
            ctx2[23]
          );
          switch_instance.$on(
            "SMUIListItem:mount",
            /*handleItemMount*/
            ctx2[18]
          );
          switch_instance.$on(
            "SMUIListItem:unmount",
            /*handleItemUnmount*/
            ctx2[19]
          );
          switch_instance.$on(
            "SMUI:action",
            /*handleAction*/
            ctx2[24]
          );
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        switch_instance.$set(switch_instance_changes);
      }
    },
    i(local) {
      if (current)
        return;
      if (switch_instance)
        transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o(local) {
      if (switch_instance)
        transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(switch_instance_anchor);
      }
      ctx[43](null);
      if (switch_instance)
        destroy_component(switch_instance, detaching);
    }
  };
}
function instance_1($$self, $$props, $$invalidate) {
  const omit_props_names = [
    "use",
    "class",
    "nonInteractive",
    "dense",
    "textualList",
    "avatarList",
    "iconList",
    "imageList",
    "thumbnailList",
    "videoList",
    "twoLine",
    "threeLine",
    "vertical",
    "wrapFocus",
    "singleSelection",
    "disabledItemsFocusable",
    "selectedIndex",
    "radioList",
    "checkList",
    "hasTypeahead",
    "component",
    "tag",
    "layout",
    "setEnabled",
    "getTypeaheadInProgress",
    "getSelectedIndex",
    "getFocusedItemIndex",
    "focusItemAtIndex",
    "getElement"
  ];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let { $$slots: slots = {}, $$scope } = $$props;
  var _a2;
  const { closest, matches } = ponyfill;
  const forwardEvents = forwardEventsBuilder(get_current_component());
  let { use = [] } = $$props;
  let { class: className = "" } = $$props;
  let { nonInteractive = false } = $$props;
  let { dense = false } = $$props;
  let { textualList = false } = $$props;
  let { avatarList = false } = $$props;
  let { iconList = false } = $$props;
  let { imageList = false } = $$props;
  let { thumbnailList = false } = $$props;
  let { videoList = false } = $$props;
  let { twoLine = false } = $$props;
  let { threeLine = false } = $$props;
  let { vertical = true } = $$props;
  let { wrapFocus = (_a2 = getContext("SMUI:list:wrapFocus")) !== null && _a2 !== void 0 ? _a2 : false } = $$props;
  let { singleSelection = false } = $$props;
  let { disabledItemsFocusable = false } = $$props;
  let { selectedIndex = -1 } = $$props;
  let { radioList = false } = $$props;
  let { checkList = false } = $$props;
  let { hasTypeahead = false } = $$props;
  let element2;
  let instance2;
  let items = [];
  let role = getContext("SMUI:list:role");
  let nav = getContext("SMUI:list:nav");
  const itemAccessorMap = /* @__PURE__ */ new WeakMap();
  let selectionDialog = getContext("SMUI:dialog:selection");
  let addLayoutListener = getContext("SMUI:addLayoutListener");
  let removeLayoutListener;
  let { component = SmuiElement } = $$props;
  let { tag = component === SmuiElement ? nav ? "nav" : "ul" : void 0 } = $$props;
  setContext("SMUI:list:nonInteractive", nonInteractive);
  setContext("SMUI:separator:context", "list");
  if (!role) {
    if (singleSelection) {
      role = "listbox";
      setContext("SMUI:list:item:role", "option");
    } else if (radioList) {
      role = "radiogroup";
      setContext("SMUI:list:item:role", "radio");
    } else if (checkList) {
      role = "group";
      setContext("SMUI:list:item:role", "checkbox");
    } else {
      role = "list";
      setContext("SMUI:list:item:role", void 0);
    }
  }
  if (addLayoutListener) {
    removeLayoutListener = addLayoutListener(layout);
  }
  onMount(() => {
    $$invalidate(41, instance2 = new MDCListFoundation({
      addClassForElementIndex,
      focusItemAtIndex,
      getAttributeForElementIndex: (index, name) => {
        var _a3, _b2;
        return (_b2 = (_a3 = getOrderedList()[index]) === null || _a3 === void 0 ? void 0 : _a3.getAttr(name)) !== null && _b2 !== void 0 ? _b2 : null;
      },
      getFocusedElementIndex: () => document.activeElement ? getOrderedList().map((accessor2) => accessor2.element).indexOf(document.activeElement) : -1,
      getListItemCount: () => items.length,
      getPrimaryTextAtIndex,
      hasCheckboxAtIndex: (index) => {
        var _a3, _b2;
        return (_b2 = (_a3 = getOrderedList()[index]) === null || _a3 === void 0 ? void 0 : _a3.hasCheckbox) !== null && _b2 !== void 0 ? _b2 : false;
      },
      hasRadioAtIndex: (index) => {
        var _a3, _b2;
        return (_b2 = (_a3 = getOrderedList()[index]) === null || _a3 === void 0 ? void 0 : _a3.hasRadio) !== null && _b2 !== void 0 ? _b2 : false;
      },
      isCheckboxCheckedAtIndex: (index) => {
        var _a3;
        const listItem = getOrderedList()[index];
        return (_a3 = (listItem === null || listItem === void 0 ? void 0 : listItem.hasCheckbox) && listItem.checked) !== null && _a3 !== void 0 ? _a3 : false;
      },
      isFocusInsideList: () => element2 != null && getElement() !== document.activeElement && getElement().contains(document.activeElement),
      isRootFocused: () => element2 != null && document.activeElement === getElement(),
      listItemAtIndexHasClass,
      notifyAction: (index) => {
        $$invalidate(26, selectedIndex = index);
        if (element2 != null) {
          dispatch(getElement(), "SMUIList:action", { index }, void 0, true);
        }
      },
      notifySelectionChange: (changedIndices) => {
        if (element2 != null) {
          dispatch(getElement(), "SMUIList:selectionChange", { changedIndices });
        }
      },
      removeClassForElementIndex,
      setAttributeForElementIndex,
      setCheckedCheckboxOrRadioAtIndex: (index, isChecked) => {
        getOrderedList()[index].checked = isChecked;
      },
      setTabIndexForListItemChildren: (listItemIndex, tabIndexValue) => {
        const listItem = getOrderedList()[listItemIndex];
        const selector = "button:not(:disabled), a";
        Array.prototype.forEach.call(listItem.element.querySelectorAll(selector), (el) => {
          el.setAttribute("tabindex", tabIndexValue);
        });
      }
    }));
    const accessor = {
      get element() {
        return getElement();
      },
      get items() {
        return items;
      },
      get typeaheadInProgress() {
        return instance2.isTypeaheadInProgress();
      },
      typeaheadMatchItem(nextChar, startingIndex) {
        return instance2.typeaheadMatchItem(
          nextChar,
          startingIndex,
          /** skipFocus */
          true
        );
      },
      getOrderedList,
      focusItemAtIndex,
      addClassForElementIndex,
      removeClassForElementIndex,
      setAttributeForElementIndex,
      removeAttributeForElementIndex,
      getAttributeFromElementIndex,
      getPrimaryTextAtIndex
    };
    dispatch(getElement(), "SMUIList:mount", accessor);
    instance2.init();
    instance2.layout();
    return () => {
      instance2.destroy();
    };
  });
  onDestroy(() => {
    if (removeLayoutListener) {
      removeLayoutListener();
    }
  });
  function handleItemMount(event) {
    items.push(event.detail);
    itemAccessorMap.set(event.detail.element, event.detail);
    if (singleSelection && event.detail.selected) {
      $$invalidate(26, selectedIndex = getListItemIndex(event.detail.element));
    }
    event.stopPropagation();
  }
  function handleItemUnmount(event) {
    var _a3;
    const idx = (_a3 = event.detail && items.indexOf(event.detail)) !== null && _a3 !== void 0 ? _a3 : -1;
    if (idx !== -1) {
      items.splice(idx, 1);
      items = items;
      itemAccessorMap.delete(event.detail.element);
    }
    event.stopPropagation();
  }
  function handleKeydown2(event) {
    if (instance2 && event.target) {
      instance2.handleKeydown(event, event.target.classList.contains("mdc-deprecated-list-item"), getListItemIndex(event.target));
    }
  }
  function handleFocusin(event) {
    if (instance2 && event.target) {
      instance2.handleFocusIn(getListItemIndex(event.target));
    }
  }
  function handleFocusout(event) {
    if (instance2 && event.target) {
      instance2.handleFocusOut(getListItemIndex(event.target));
    }
  }
  function handleClick(event) {
    if (instance2 && event.target) {
      instance2.handleClick(getListItemIndex(event.target), !matches(event.target, 'input[type="checkbox"], input[type="radio"]'), event);
    }
  }
  function handleAction(event) {
    if (radioList || checkList) {
      const index = getListItemIndex(event.target);
      if (index !== -1) {
        const item = getOrderedList()[index];
        if (item && (radioList && !item.checked || checkList)) {
          if (!matches(event.detail.target, 'input[type="checkbox"], input[type="radio"]')) {
            item.checked = !item.checked;
          }
          item.activateRipple();
          window.requestAnimationFrame(() => {
            item.deactivateRipple();
          });
        }
      }
    }
  }
  function getOrderedList() {
    if (element2 == null) {
      return [];
    }
    return [...getElement().children].map((element3) => itemAccessorMap.get(element3)).filter((accessor) => accessor && accessor._smui_list_item_accessor);
  }
  function listItemAtIndexHasClass(index, className2) {
    var _a3;
    const accessor = getOrderedList()[index];
    return (_a3 = accessor && accessor.hasClass(className2)) !== null && _a3 !== void 0 ? _a3 : false;
  }
  function addClassForElementIndex(index, className2) {
    const accessor = getOrderedList()[index];
    accessor && accessor.addClass(className2);
  }
  function removeClassForElementIndex(index, className2) {
    const accessor = getOrderedList()[index];
    accessor && accessor.removeClass(className2);
  }
  function setAttributeForElementIndex(index, name, value) {
    const accessor = getOrderedList()[index];
    accessor && accessor.addAttr(name, value);
  }
  function removeAttributeForElementIndex(index, name) {
    const accessor = getOrderedList()[index];
    accessor && accessor.removeAttr(name);
  }
  function getAttributeFromElementIndex(index, name) {
    const accessor = getOrderedList()[index];
    if (accessor) {
      return accessor.getAttr(name);
    } else {
      return null;
    }
  }
  function getPrimaryTextAtIndex(index) {
    var _a3;
    const accessor = getOrderedList()[index];
    return (_a3 = accessor && accessor.getPrimaryText()) !== null && _a3 !== void 0 ? _a3 : "";
  }
  function getListItemIndex(element3) {
    const nearestParent = closest(element3, ".mdc-deprecated-list-item, .mdc-deprecated-list");
    if (nearestParent && matches(nearestParent, ".mdc-deprecated-list-item")) {
      return getOrderedList().map((item) => item === null || item === void 0 ? void 0 : item.element).indexOf(nearestParent);
    }
    return -1;
  }
  function layout() {
    return instance2.layout();
  }
  function setEnabled(itemIndex, isEnabled) {
    return instance2.setEnabled(itemIndex, isEnabled);
  }
  function getTypeaheadInProgress() {
    return instance2.isTypeaheadInProgress();
  }
  function getSelectedIndex() {
    return instance2.getSelectedIndex();
  }
  function getFocusedItemIndex() {
    return instance2.getFocusedItemIndex();
  }
  function focusItemAtIndex(index) {
    const accessor = getOrderedList()[index];
    accessor && "focus" in accessor.element && accessor.element.focus();
  }
  function getElement() {
    return element2.getElement();
  }
  function switch_instance_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      element2 = $$value;
      $$invalidate(14, element2);
    });
  }
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(25, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("use" in $$new_props)
      $$invalidate(0, use = $$new_props.use);
    if ("class" in $$new_props)
      $$invalidate(1, className = $$new_props.class);
    if ("nonInteractive" in $$new_props)
      $$invalidate(2, nonInteractive = $$new_props.nonInteractive);
    if ("dense" in $$new_props)
      $$invalidate(3, dense = $$new_props.dense);
    if ("textualList" in $$new_props)
      $$invalidate(4, textualList = $$new_props.textualList);
    if ("avatarList" in $$new_props)
      $$invalidate(5, avatarList = $$new_props.avatarList);
    if ("iconList" in $$new_props)
      $$invalidate(6, iconList = $$new_props.iconList);
    if ("imageList" in $$new_props)
      $$invalidate(7, imageList = $$new_props.imageList);
    if ("thumbnailList" in $$new_props)
      $$invalidate(8, thumbnailList = $$new_props.thumbnailList);
    if ("videoList" in $$new_props)
      $$invalidate(9, videoList = $$new_props.videoList);
    if ("twoLine" in $$new_props)
      $$invalidate(10, twoLine = $$new_props.twoLine);
    if ("threeLine" in $$new_props)
      $$invalidate(11, threeLine = $$new_props.threeLine);
    if ("vertical" in $$new_props)
      $$invalidate(27, vertical = $$new_props.vertical);
    if ("wrapFocus" in $$new_props)
      $$invalidate(28, wrapFocus = $$new_props.wrapFocus);
    if ("singleSelection" in $$new_props)
      $$invalidate(29, singleSelection = $$new_props.singleSelection);
    if ("disabledItemsFocusable" in $$new_props)
      $$invalidate(30, disabledItemsFocusable = $$new_props.disabledItemsFocusable);
    if ("selectedIndex" in $$new_props)
      $$invalidate(26, selectedIndex = $$new_props.selectedIndex);
    if ("radioList" in $$new_props)
      $$invalidate(31, radioList = $$new_props.radioList);
    if ("checkList" in $$new_props)
      $$invalidate(32, checkList = $$new_props.checkList);
    if ("hasTypeahead" in $$new_props)
      $$invalidate(33, hasTypeahead = $$new_props.hasTypeahead);
    if ("component" in $$new_props)
      $$invalidate(12, component = $$new_props.component);
    if ("tag" in $$new_props)
      $$invalidate(13, tag = $$new_props.tag);
    if ("$$scope" in $$new_props)
      $$invalidate(44, $$scope = $$new_props.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty[0] & /*vertical*/
    134217728 | $$self.$$.dirty[1] & /*instance*/
    1024) {
      if (instance2) {
        instance2.setVerticalOrientation(vertical);
      }
    }
    if ($$self.$$.dirty[0] & /*wrapFocus*/
    268435456 | $$self.$$.dirty[1] & /*instance*/
    1024) {
      if (instance2) {
        instance2.setWrapFocus(wrapFocus);
      }
    }
    if ($$self.$$.dirty[1] & /*instance, hasTypeahead*/
    1028) {
      if (instance2) {
        instance2.setHasTypeahead(hasTypeahead);
      }
    }
    if ($$self.$$.dirty[0] & /*singleSelection*/
    536870912 | $$self.$$.dirty[1] & /*instance*/
    1024) {
      if (instance2) {
        instance2.setSingleSelection(singleSelection);
      }
    }
    if ($$self.$$.dirty[0] & /*disabledItemsFocusable*/
    1073741824 | $$self.$$.dirty[1] & /*instance*/
    1024) {
      if (instance2) {
        instance2.setDisabledItemsFocusable(disabledItemsFocusable);
      }
    }
    if ($$self.$$.dirty[0] & /*singleSelection, selectedIndex*/
    603979776 | $$self.$$.dirty[1] & /*instance*/
    1024) {
      if (instance2 && singleSelection && getSelectedIndex() !== selectedIndex) {
        instance2.setSelectedIndex(selectedIndex);
      }
    }
  };
  return [
    use,
    className,
    nonInteractive,
    dense,
    textualList,
    avatarList,
    iconList,
    imageList,
    thumbnailList,
    videoList,
    twoLine,
    threeLine,
    component,
    tag,
    element2,
    role,
    forwardEvents,
    selectionDialog,
    handleItemMount,
    handleItemUnmount,
    handleKeydown2,
    handleFocusin,
    handleFocusout,
    handleClick,
    handleAction,
    $$restProps,
    selectedIndex,
    vertical,
    wrapFocus,
    singleSelection,
    disabledItemsFocusable,
    radioList,
    checkList,
    hasTypeahead,
    layout,
    setEnabled,
    getTypeaheadInProgress,
    getSelectedIndex,
    getFocusedItemIndex,
    focusItemAtIndex,
    getElement,
    instance2,
    slots,
    switch_instance_binding,
    $$scope
  ];
}
class List extends SvelteComponent {
  constructor(options) {
    super();
    init(
      this,
      options,
      instance_1,
      create_fragment$1,
      safe_not_equal,
      {
        use: 0,
        class: 1,
        nonInteractive: 2,
        dense: 3,
        textualList: 4,
        avatarList: 5,
        iconList: 6,
        imageList: 7,
        thumbnailList: 8,
        videoList: 9,
        twoLine: 10,
        threeLine: 11,
        vertical: 27,
        wrapFocus: 28,
        singleSelection: 29,
        disabledItemsFocusable: 30,
        selectedIndex: 26,
        radioList: 31,
        checkList: 32,
        hasTypeahead: 33,
        component: 12,
        tag: 13,
        layout: 34,
        setEnabled: 35,
        getTypeaheadInProgress: 36,
        getSelectedIndex: 37,
        getFocusedItemIndex: 38,
        focusItemAtIndex: 39,
        getElement: 40
      },
      null,
      [-1, -1]
    );
  }
  get layout() {
    return this.$$.ctx[34];
  }
  get setEnabled() {
    return this.$$.ctx[35];
  }
  get getTypeaheadInProgress() {
    return this.$$.ctx[36];
  }
  get getSelectedIndex() {
    return this.$$.ctx[37];
  }
  get getFocusedItemIndex() {
    return this.$$.ctx[38];
  }
  get focusItemAtIndex() {
    return this.$$.ctx[39];
  }
  get getElement() {
    return this.$$.ctx[40];
  }
}
function create_if_block(ctx) {
  let span;
  return {
    c() {
      span = element("span");
      this.h();
    },
    l(nodes) {
      span = claim_element(nodes, "SPAN", { class: true });
      children(span).forEach(detach);
      this.h();
    },
    h() {
      attr(span, "class", "mdc-deprecated-list-item__ripple");
    },
    m(target, anchor) {
      insert_hydration(target, span, anchor);
    },
    d(detaching) {
      if (detaching) {
        detach(span);
      }
    }
  };
}
function create_default_slot(ctx) {
  let if_block_anchor;
  let current;
  let if_block = (
    /*ripple*/
    ctx[7] && create_if_block()
  );
  const default_slot_template = (
    /*#slots*/
    ctx[34].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[37],
    null
  );
  return {
    c() {
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
      if (default_slot)
        default_slot.c();
    },
    l(nodes) {
      if (if_block)
        if_block.l(nodes);
      if_block_anchor = empty();
      if (default_slot)
        default_slot.l(nodes);
    },
    m(target, anchor) {
      if (if_block)
        if_block.m(target, anchor);
      insert_hydration(target, if_block_anchor, anchor);
      if (default_slot) {
        default_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (
        /*ripple*/
        ctx2[7]
      ) {
        if (if_block)
          ;
        else {
          if_block = create_if_block();
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
      if (default_slot) {
        if (default_slot.p && (!current || dirty[1] & /*$$scope*/
        64)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[37],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[37]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[37],
              dirty,
              null
            ),
            null
          );
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(if_block_anchor);
      }
      if (if_block)
        if_block.d(detaching);
      if (default_slot)
        default_slot.d(detaching);
    }
  };
}
function create_fragment(ctx) {
  let switch_instance;
  let switch_instance_anchor;
  let current;
  const switch_instance_spread_levels = [
    { tag: (
      /*tag*/
      ctx[14]
    ) },
    {
      use: [
        .../*nonInteractive*/
        ctx[6] ? [] : [
          [
            Ripple,
            {
              ripple: !/*input*/
              ctx[16],
              unbounded: false,
              color: (
                /*activated*/
                (ctx[1] || /*selected*/
                ctx[0]) && /*color*/
                ctx[5] == null ? "primary" : (
                  /*color*/
                  ctx[5]
                )
              ),
              disabled: (
                /*disabled*/
                ctx[10]
              ),
              addClass: (
                /*addClass*/
                ctx[24]
              ),
              removeClass: (
                /*removeClass*/
                ctx[25]
              ),
              addStyle: (
                /*addStyle*/
                ctx[26]
              )
            }
          ]
        ],
        /*forwardEvents*/
        ctx[22],
        .../*use*/
        ctx[2]
      ]
    },
    {
      class: classMap({
        [
          /*className*/
          ctx[3]
        ]: true,
        "mdc-deprecated-list-item": !/*wrapper*/
        ctx[8],
        "mdc-deprecated-list-item__wrapper": (
          /*wrapper*/
          ctx[8]
        ),
        "mdc-deprecated-list-item--activated": (
          /*activated*/
          ctx[1]
        ),
        "mdc-deprecated-list-item--selected": (
          /*selected*/
          ctx[0]
        ),
        "mdc-deprecated-list-item--disabled": (
          /*disabled*/
          ctx[10]
        ),
        "mdc-menu-item--selected": !/*nav*/
        ctx[23] && /*role*/
        ctx[9] === "menuitem" && /*selected*/
        ctx[0],
        "smui-menu-item--non-interactive": (
          /*nonInteractive*/
          ctx[6]
        ),
        .../*internalClasses*/
        ctx[18]
      })
    },
    {
      style: Object.entries(
        /*internalStyles*/
        ctx[19]
      ).map(func).concat([
        /*style*/
        ctx[4]
      ]).join(" ")
    },
    /*nav*/
    ctx[23] && /*activated*/
    ctx[1] ? { "aria-current": "page" } : {},
    !/*nav*/
    ctx[23] || /*wrapper*/
    ctx[8] ? { role: (
      /*role*/
      ctx[9]
    ) } : {},
    !/*nav*/
    ctx[23] && /*role*/
    ctx[9] === "option" ? {
      "aria-selected": (
        /*selected*/
        ctx[0] ? "true" : "false"
      )
    } : {},
    !/*nav*/
    ctx[23] && /*role*/
    (ctx[9] === "radio" || /*role*/
    ctx[9] === "checkbox") ? {
      "aria-checked": (
        /*input*/
        ctx[16] && /*input*/
        ctx[16].checked ? "true" : "false"
      )
    } : {},
    !/*nav*/
    ctx[23] ? {
      "aria-disabled": (
        /*disabled*/
        ctx[10] ? "true" : "false"
      )
    } : {},
    {
      "data-menu-item-skip-restore-focus": (
        /*skipRestoreFocus*/
        ctx[11] || void 0
      )
    },
    { tabindex: (
      /*tabindex*/
      ctx[21]
    ) },
    { href: (
      /*href*/
      ctx[12]
    ) },
    /*internalAttrs*/
    ctx[20],
    /*$$restProps*/
    ctx[29]
  ];
  var switch_value = (
    /*component*/
    ctx[13]
  );
  function switch_props(ctx2) {
    let switch_instance_props = {
      $$slots: { default: [create_default_slot] },
      $$scope: { ctx: ctx2 }
    };
    for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
      switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    }
    return { props: switch_instance_props };
  }
  if (switch_value) {
    switch_instance = construct_svelte_component(switch_value, switch_props(ctx));
    ctx[35](switch_instance);
    switch_instance.$on(
      "click",
      /*action*/
      ctx[15]
    );
    switch_instance.$on(
      "keydown",
      /*handleKeydown*/
      ctx[27]
    );
    switch_instance.$on(
      "SMUIGenericInput:mount",
      /*handleInputMount*/
      ctx[28]
    );
    switch_instance.$on(
      "SMUIGenericInput:unmount",
      /*SMUIGenericInput_unmount_handler*/
      ctx[36]
    );
  }
  return {
    c() {
      if (switch_instance)
        create_component(switch_instance.$$.fragment);
      switch_instance_anchor = empty();
    },
    l(nodes) {
      if (switch_instance)
        claim_component(switch_instance.$$.fragment, nodes);
      switch_instance_anchor = empty();
    },
    m(target, anchor) {
      if (switch_instance)
        mount_component(switch_instance, target, anchor);
      insert_hydration(target, switch_instance_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const switch_instance_changes = dirty[0] & /*tag, nonInteractive, input, activated, selected, color, disabled, addClass, removeClass, addStyle, forwardEvents, use, className, wrapper, nav, role, internalClasses, internalStyles, style, skipRestoreFocus, tabindex, href, internalAttrs, $$restProps*/
      670916479 ? get_spread_update(switch_instance_spread_levels, [
        dirty[0] & /*tag*/
        16384 && { tag: (
          /*tag*/
          ctx2[14]
        ) },
        dirty[0] & /*nonInteractive, input, activated, selected, color, disabled, addClass, removeClass, addStyle, forwardEvents, use*/
        121701479 && {
          use: [
            .../*nonInteractive*/
            ctx2[6] ? [] : [
              [
                Ripple,
                {
                  ripple: !/*input*/
                  ctx2[16],
                  unbounded: false,
                  color: (
                    /*activated*/
                    (ctx2[1] || /*selected*/
                    ctx2[0]) && /*color*/
                    ctx2[5] == null ? "primary" : (
                      /*color*/
                      ctx2[5]
                    )
                  ),
                  disabled: (
                    /*disabled*/
                    ctx2[10]
                  ),
                  addClass: (
                    /*addClass*/
                    ctx2[24]
                  ),
                  removeClass: (
                    /*removeClass*/
                    ctx2[25]
                  ),
                  addStyle: (
                    /*addStyle*/
                    ctx2[26]
                  )
                }
              ]
            ],
            /*forwardEvents*/
            ctx2[22],
            .../*use*/
            ctx2[2]
          ]
        },
        dirty[0] & /*className, wrapper, activated, selected, disabled, nav, role, nonInteractive, internalClasses*/
        8652619 && {
          class: classMap({
            [
              /*className*/
              ctx2[3]
            ]: true,
            "mdc-deprecated-list-item": !/*wrapper*/
            ctx2[8],
            "mdc-deprecated-list-item__wrapper": (
              /*wrapper*/
              ctx2[8]
            ),
            "mdc-deprecated-list-item--activated": (
              /*activated*/
              ctx2[1]
            ),
            "mdc-deprecated-list-item--selected": (
              /*selected*/
              ctx2[0]
            ),
            "mdc-deprecated-list-item--disabled": (
              /*disabled*/
              ctx2[10]
            ),
            "mdc-menu-item--selected": !/*nav*/
            ctx2[23] && /*role*/
            ctx2[9] === "menuitem" && /*selected*/
            ctx2[0],
            "smui-menu-item--non-interactive": (
              /*nonInteractive*/
              ctx2[6]
            ),
            .../*internalClasses*/
            ctx2[18]
          })
        },
        dirty[0] & /*internalStyles, style*/
        524304 && {
          style: Object.entries(
            /*internalStyles*/
            ctx2[19]
          ).map(func).concat([
            /*style*/
            ctx2[4]
          ]).join(" ")
        },
        dirty[0] & /*nav, activated*/
        8388610 && get_spread_object(
          /*nav*/
          ctx2[23] && /*activated*/
          ctx2[1] ? { "aria-current": "page" } : {}
        ),
        dirty[0] & /*nav, wrapper, role*/
        8389376 && get_spread_object(!/*nav*/
        ctx2[23] || /*wrapper*/
        ctx2[8] ? { role: (
          /*role*/
          ctx2[9]
        ) } : {}),
        dirty[0] & /*nav, role, selected*/
        8389121 && get_spread_object(!/*nav*/
        ctx2[23] && /*role*/
        ctx2[9] === "option" ? {
          "aria-selected": (
            /*selected*/
            ctx2[0] ? "true" : "false"
          )
        } : {}),
        dirty[0] & /*nav, role, input*/
        8454656 && get_spread_object(!/*nav*/
        ctx2[23] && /*role*/
        (ctx2[9] === "radio" || /*role*/
        ctx2[9] === "checkbox") ? {
          "aria-checked": (
            /*input*/
            ctx2[16] && /*input*/
            ctx2[16].checked ? "true" : "false"
          )
        } : {}),
        dirty[0] & /*nav, disabled*/
        8389632 && get_spread_object(!/*nav*/
        ctx2[23] ? {
          "aria-disabled": (
            /*disabled*/
            ctx2[10] ? "true" : "false"
          )
        } : {}),
        dirty[0] & /*skipRestoreFocus*/
        2048 && {
          "data-menu-item-skip-restore-focus": (
            /*skipRestoreFocus*/
            ctx2[11] || void 0
          )
        },
        dirty[0] & /*tabindex*/
        2097152 && { tabindex: (
          /*tabindex*/
          ctx2[21]
        ) },
        dirty[0] & /*href*/
        4096 && { href: (
          /*href*/
          ctx2[12]
        ) },
        dirty[0] & /*internalAttrs*/
        1048576 && get_spread_object(
          /*internalAttrs*/
          ctx2[20]
        ),
        dirty[0] & /*$$restProps*/
        536870912 && get_spread_object(
          /*$$restProps*/
          ctx2[29]
        )
      ]) : {};
      if (dirty[0] & /*ripple*/
      128 | dirty[1] & /*$$scope*/
      64) {
        switch_instance_changes.$$scope = { dirty, ctx: ctx2 };
      }
      if (dirty[0] & /*component*/
      8192 && switch_value !== (switch_value = /*component*/
      ctx2[13])) {
        if (switch_instance) {
          group_outros();
          const old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1);
          });
          check_outros();
        }
        if (switch_value) {
          switch_instance = construct_svelte_component(switch_value, switch_props(ctx2));
          ctx2[35](switch_instance);
          switch_instance.$on(
            "click",
            /*action*/
            ctx2[15]
          );
          switch_instance.$on(
            "keydown",
            /*handleKeydown*/
            ctx2[27]
          );
          switch_instance.$on(
            "SMUIGenericInput:mount",
            /*handleInputMount*/
            ctx2[28]
          );
          switch_instance.$on(
            "SMUIGenericInput:unmount",
            /*SMUIGenericInput_unmount_handler*/
            ctx2[36]
          );
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        switch_instance.$set(switch_instance_changes);
      }
    },
    i(local) {
      if (current)
        return;
      if (switch_instance)
        transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o(local) {
      if (switch_instance)
        transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(switch_instance_anchor);
      }
      ctx[35](null);
      if (switch_instance)
        destroy_component(switch_instance, detaching);
    }
  };
}
let counter = 0;
const func = ([name, value]) => `${name}: ${value};`;
function instance($$self, $$props, $$invalidate) {
  let tabindex;
  const omit_props_names = [
    "use",
    "class",
    "style",
    "color",
    "nonInteractive",
    "ripple",
    "wrapper",
    "activated",
    "role",
    "selected",
    "disabled",
    "skipRestoreFocus",
    "tabindex",
    "inputId",
    "href",
    "component",
    "tag",
    "action",
    "getPrimaryText",
    "getElement"
  ];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let { $$slots: slots = {}, $$scope } = $$props;
  var _a2;
  const forwardEvents = forwardEventsBuilder(get_current_component());
  let uninitializedValue = () => {
  };
  function isUninitializedValue(value) {
    return value === uninitializedValue;
  }
  let { use = [] } = $$props;
  let { class: className = "" } = $$props;
  let { style = "" } = $$props;
  let { color = void 0 } = $$props;
  let { nonInteractive = (_a2 = getContext("SMUI:list:nonInteractive")) !== null && _a2 !== void 0 ? _a2 : false } = $$props;
  setContext("SMUI:list:nonInteractive", void 0);
  let { ripple = !nonInteractive } = $$props;
  let { wrapper = false } = $$props;
  let { activated = false } = $$props;
  let { role = wrapper ? "presentation" : getContext("SMUI:list:item:role") } = $$props;
  setContext("SMUI:list:item:role", void 0);
  let { selected = false } = $$props;
  let { disabled = false } = $$props;
  let { skipRestoreFocus = false } = $$props;
  let { tabindex: tabindexProp = uninitializedValue } = $$props;
  let { inputId = "SMUI-form-field-list-" + counter++ } = $$props;
  let { href = void 0 } = $$props;
  let element2;
  let internalClasses = {};
  let internalStyles = {};
  let internalAttrs = {};
  let input;
  let addTabindexIfNoItemsSelectedRaf;
  let nav = getContext("SMUI:list:item:nav");
  let { component = SmuiElement } = $$props;
  let { tag = component === SmuiElement ? nav ? href ? "a" : "span" : "li" : void 0 } = $$props;
  setContext("SMUI:generic:input:props", { id: inputId });
  setContext("SMUI:separator:context", void 0);
  onMount(() => {
    if (!selected && !nonInteractive) {
      let first = true;
      let el = element2.getElement();
      while (el.previousSibling) {
        el = el.previousSibling;
        if (el.nodeType === 1 && el.classList.contains("mdc-deprecated-list-item") && !el.classList.contains("mdc-deprecated-list-item--disabled")) {
          first = false;
          break;
        }
      }
      if (first) {
        addTabindexIfNoItemsSelectedRaf = window.requestAnimationFrame(() => addTabindexIfNoItemsSelected(el));
      }
    }
    const accessor = {
      _smui_list_item_accessor: true,
      get element() {
        return getElement();
      },
      get selected() {
        return selected;
      },
      set selected(value) {
        $$invalidate(0, selected = value);
      },
      hasClass,
      addClass,
      removeClass,
      getAttr,
      addAttr,
      removeAttr,
      getPrimaryText,
      // For inputs within item.
      get checked() {
        var _a3;
        return (_a3 = input && input.checked) !== null && _a3 !== void 0 ? _a3 : false;
      },
      set checked(value) {
        if (input) {
          $$invalidate(16, input.checked = !!value, input);
        }
      },
      get hasCheckbox() {
        return !!(input && "_smui_checkbox_accessor" in input);
      },
      get hasRadio() {
        return !!(input && "_smui_radio_accessor" in input);
      },
      activateRipple() {
        if (input) {
          input.activateRipple();
        }
      },
      deactivateRipple() {
        if (input) {
          input.deactivateRipple();
        }
      },
      // For select options.
      getValue() {
        return $$restProps.value;
      },
      // For autocomplete
      action,
      get tabindex() {
        return tabindex;
      },
      set tabindex(value) {
        $$invalidate(30, tabindexProp = value);
      },
      get disabled() {
        return disabled;
      },
      get activated() {
        return activated;
      },
      set activated(value) {
        $$invalidate(1, activated = value);
      }
    };
    dispatch(getElement(), "SMUIListItem:mount", accessor);
    return () => {
      dispatch(getElement(), "SMUIListItem:unmount", accessor);
    };
  });
  onDestroy(() => {
    if (addTabindexIfNoItemsSelectedRaf) {
      window.cancelAnimationFrame(addTabindexIfNoItemsSelectedRaf);
    }
  });
  function hasClass(className2) {
    return className2 in internalClasses ? internalClasses[className2] : getElement().classList.contains(className2);
  }
  function addClass(className2) {
    if (!internalClasses[className2]) {
      $$invalidate(18, internalClasses[className2] = true, internalClasses);
    }
  }
  function removeClass(className2) {
    if (!(className2 in internalClasses) || internalClasses[className2]) {
      $$invalidate(18, internalClasses[className2] = false, internalClasses);
    }
  }
  function addStyle(name, value) {
    if (internalStyles[name] != value) {
      if (value === "" || value == null) {
        delete internalStyles[name];
        $$invalidate(19, internalStyles);
      } else {
        $$invalidate(19, internalStyles[name] = value, internalStyles);
      }
    }
  }
  function getAttr(name) {
    var _a3;
    return name in internalAttrs ? (_a3 = internalAttrs[name]) !== null && _a3 !== void 0 ? _a3 : null : getElement().getAttribute(name);
  }
  function addAttr(name, value) {
    if (internalAttrs[name] !== value) {
      $$invalidate(20, internalAttrs[name] = value, internalAttrs);
    }
  }
  function removeAttr(name) {
    if (!(name in internalAttrs) || internalAttrs[name] != null) {
      $$invalidate(20, internalAttrs[name] = void 0, internalAttrs);
    }
  }
  function addTabindexIfNoItemsSelected(el) {
    let noneSelected = true;
    while (el.nextElementSibling) {
      el = el.nextElementSibling;
      if (el.nodeType === 1 && el.classList.contains("mdc-deprecated-list-item")) {
        const tabindexAttr = el.attributes.getNamedItem("tabindex");
        if (tabindexAttr && tabindexAttr.value === "0") {
          noneSelected = false;
          break;
        }
      }
    }
    if (noneSelected) {
      $$invalidate(21, tabindex = 0);
    }
  }
  function handleKeydown2(e) {
    const isEnter = e.key === "Enter";
    const isSpace = e.key === "Space";
    if (isEnter || isSpace) {
      action(e);
    }
  }
  function handleInputMount(e) {
    if ("_smui_checkbox_accessor" in e.detail || "_smui_radio_accessor" in e.detail) {
      $$invalidate(16, input = e.detail);
    }
  }
  function action(e) {
    if (!disabled) {
      dispatch(getElement(), "SMUI:action", e);
    }
  }
  function getPrimaryText() {
    var _a3, _b2, _c;
    const element3 = getElement();
    const primaryText = element3.querySelector(".mdc-deprecated-list-item__primary-text");
    if (primaryText) {
      return (_a3 = primaryText.textContent) !== null && _a3 !== void 0 ? _a3 : "";
    }
    const text = element3.querySelector(".mdc-deprecated-list-item__text");
    if (text) {
      return (_b2 = text.textContent) !== null && _b2 !== void 0 ? _b2 : "";
    }
    return (_c = element3.textContent) !== null && _c !== void 0 ? _c : "";
  }
  function getElement() {
    return element2.getElement();
  }
  function switch_instance_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      element2 = $$value;
      $$invalidate(17, element2);
    });
  }
  const SMUIGenericInput_unmount_handler = () => $$invalidate(16, input = void 0);
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(29, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("use" in $$new_props)
      $$invalidate(2, use = $$new_props.use);
    if ("class" in $$new_props)
      $$invalidate(3, className = $$new_props.class);
    if ("style" in $$new_props)
      $$invalidate(4, style = $$new_props.style);
    if ("color" in $$new_props)
      $$invalidate(5, color = $$new_props.color);
    if ("nonInteractive" in $$new_props)
      $$invalidate(6, nonInteractive = $$new_props.nonInteractive);
    if ("ripple" in $$new_props)
      $$invalidate(7, ripple = $$new_props.ripple);
    if ("wrapper" in $$new_props)
      $$invalidate(8, wrapper = $$new_props.wrapper);
    if ("activated" in $$new_props)
      $$invalidate(1, activated = $$new_props.activated);
    if ("role" in $$new_props)
      $$invalidate(9, role = $$new_props.role);
    if ("selected" in $$new_props)
      $$invalidate(0, selected = $$new_props.selected);
    if ("disabled" in $$new_props)
      $$invalidate(10, disabled = $$new_props.disabled);
    if ("skipRestoreFocus" in $$new_props)
      $$invalidate(11, skipRestoreFocus = $$new_props.skipRestoreFocus);
    if ("tabindex" in $$new_props)
      $$invalidate(30, tabindexProp = $$new_props.tabindex);
    if ("inputId" in $$new_props)
      $$invalidate(31, inputId = $$new_props.inputId);
    if ("href" in $$new_props)
      $$invalidate(12, href = $$new_props.href);
    if ("component" in $$new_props)
      $$invalidate(13, component = $$new_props.component);
    if ("tag" in $$new_props)
      $$invalidate(14, tag = $$new_props.tag);
    if ("$$scope" in $$new_props)
      $$invalidate(37, $$scope = $$new_props.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty[0] & /*tabindexProp, nonInteractive, disabled, selected, input*/
    1073808449) {
      $$invalidate(21, tabindex = isUninitializedValue(tabindexProp) ? !nonInteractive && !disabled && (selected || input && input.checked) ? 0 : -1 : tabindexProp);
    }
  };
  return [
    selected,
    activated,
    use,
    className,
    style,
    color,
    nonInteractive,
    ripple,
    wrapper,
    role,
    disabled,
    skipRestoreFocus,
    href,
    component,
    tag,
    action,
    input,
    element2,
    internalClasses,
    internalStyles,
    internalAttrs,
    tabindex,
    forwardEvents,
    nav,
    addClass,
    removeClass,
    addStyle,
    handleKeydown2,
    handleInputMount,
    $$restProps,
    tabindexProp,
    inputId,
    getPrimaryText,
    getElement,
    slots,
    switch_instance_binding,
    SMUIGenericInput_unmount_handler,
    $$scope
  ];
}
class Item extends SvelteComponent {
  constructor(options) {
    super();
    init(
      this,
      options,
      instance,
      create_fragment,
      safe_not_equal,
      {
        use: 2,
        class: 3,
        style: 4,
        color: 5,
        nonInteractive: 6,
        ripple: 7,
        wrapper: 8,
        activated: 1,
        role: 9,
        selected: 0,
        disabled: 10,
        skipRestoreFocus: 11,
        tabindex: 30,
        inputId: 31,
        href: 12,
        component: 13,
        tag: 14,
        action: 15,
        getPrimaryText: 32,
        getElement: 33
      },
      null,
      [-1, -1]
    );
  }
  get action() {
    return this.$$.ctx[15];
  }
  get getPrimaryText() {
    return this.$$.ctx[32];
  }
  get getElement() {
    return this.$$.ctx[33];
  }
}
const Text = classAdderBuilder({
  class: "mdc-deprecated-list-item__text",
  tag: "span"
});
classAdderBuilder({
  class: "mdc-deprecated-list-item__primary-text",
  tag: "span"
});
classAdderBuilder({
  class: "mdc-deprecated-list-item__secondary-text",
  tag: "span"
});
classAdderBuilder({
  class: "mdc-deprecated-list-item__meta",
  tag: "span"
});
classAdderBuilder({
  class: "mdc-deprecated-list-group",
  tag: "div"
});
classAdderBuilder({
  class: "mdc-deprecated-list-group__subheader",
  tag: "h3"
});
export {
  Item as I,
  KEY as K,
  List as L,
  Text as T,
  cssClasses as c,
  normalizeKey as n
};
