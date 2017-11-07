if (!$('script[src$="autofillFSP.js"]:first').attr("hasexecuted")) {
  $(document).ready(function () {
    $(".formAutoFill").each(function () {
      $(this).find('input[type="text"],textarea').focus(function () {
        if ($(this).val() == $(this).attr("title"))
          $(this).val("");
        $(this).css({
          fontWeight: "normal"
        })
      });
      $(this).find("input:text,textarea").blur(function () {
        if (!$(this).val())
          $(this).val($(this).attr("title"));
        if ($(this).val() == $(this).attr("title")) {
          if ($(this).parent().parent().find('label[for="' + $(this).attr("id") + '"] strong').length)
            $(this).css({
              fontWeight: "bold"
            })
        }
      });
      $(this).find('input[type="text"],textarea').each(function () {
        var myLabel = $(this).parent().parent().find('label[for="' + $(this).attr("id") + '"]:not(.formHide)');
        if (!myLabel.find('input[type="text"]').length)
          myLabel.addClass("formLabelHide");
        $(this).val($(this).attr("title"));
        if (myLabel.find("strong").length)
          $(this).css({
            fontWeight: "bold"
          })
      })
    })
  });
  $('script[src$="autofillFSP.js"]:first').attr("hasexecuted", true)
}
function addMarketingFields(form) {
  if ("undefined" !== typeof visitorId) {
    var e = document.createElement("input");
    e.type = "hidden";
    e.value = visitorId;
    e.name = "adobeVisitorId";
    form.appendChild(e)
  }
  if ("undefined" !== typeof reportSuite) {
    var d = document.createElement("input");
    d.type = "hidden";
    d.value = reportSuite;
    d.name = "adobeReportSuites";
    form.appendChild(d)
  }
  if ("undefined" !== typeof transactionId) {
    var c = document.createElement("input");
    c.type = "hidden";
    c.value = transactionId;
    c.name = "adobeTransactionId";
    form.appendChild(c)
  }
}
function addgmttime(form) {
  var da = new Date;
  var cookie_set = "";
  var str = da.toGMTString();
  var dgmt = Date.parse(str);
  var cookie_set = false;
  if (eval(document.forms[0])) {
    var e = document.createElement("input");
    e.type = "hidden";
    e.value = dgmt;
    e.name = "loadgmttime";
    form.appendChild(e);
    var d = document.createElement("input");
    d.type = "hidden";
    d.value = str;
    d.name = "dformat";
    form.appendChild(d)
  }
  SetCookie("subid", "findlawsession", 1);
  if (ReadCookie("subid")) {
    cookie_set = "enabled";
    DeleteCookie("subid")
  } else {
    cookie_set = "disabled"
  }
  if (eval(document.forms[0])) {
    var c = document.createElement("input");
    c.type = "hidden";
    c.value = cookie_set;
    c.name = "cookie";
    form.appendChild(c)
  }
}
function SetCookie(cookieName, cookieValue, nDays) {
  var today = new Date;
  var expire = new Date;
  if (nDays == null || nDays == 0)
    nDays = 1;
  expire.setTime(today.getTime() + 36e5 * 24 * nDays);
  document.cookie = cookieName + "=" + cookieValue + ";expires=" + expire.toGMTString()
}
function ReadCookie(cookieName) {
  var theCookie = "" + document.cookie;
  var ind = theCookie.indexOf(cookieName);
  if (ind == -1 || cookieName == "")
    return "";
  var ind1 = theCookie.indexOf(";", ind);
  if (ind1 == -1)
    ind1 = theCookie.length;
  return theCookie.substring(ind + cookieName.length + 1, ind1)
}
function DeleteCookie(cookieName) {
  var today = new Date;
  var expire1 = new Date;
  expire1.setTime(today.getTime() - 36e5 * 24);
  document.cookie = cookieName + "= ;expires=" + expire1.toGMTString()
}
function trim(stringToTrim) {
  return stringToTrim.replace(/^\s+|\s+$/g, "")
}
function ltrim(stringToTrim) {
  return stringToTrim.replace(/^\s+/, "")
}
function rtrim(stringToTrim) {
  return stringToTrim.replace(/\s+$/, "")
}
if (!$('script[src$="formValidationFSP.js"]:first').attr("hasexecuted")) {
  String.prototype.trim = function () {
    return this.replace(/^\s+/, "").replace(/\s+$/, "")
  };
  function formValidation(objForm) {
    var objGroups = {};
    $("#formError").addClass("formHide");
    $("#formError").removeAttr("id");
    dataCount = objForm.find(".dataCheck").length;
    dataCount = 0;
    validateCount = objForm.find(".validate").length;
    validatedCount = 0;
    var conAdvArrFields = $.makeArray(objForm.find(".dataCheck"));
    var arrFields = $.makeArray(objForm.find(".validate"));
    for (var i = 0; i < conAdvArrFields.length; i++) {
      var conAdvField = $(conAdvArrFields[i]),
        conAdvFieldValue = conAdvField.val(),
        conAdvFieldID = conAdvField.attr("id"),
        conAdvFieldName = conAdvField.attr("name");
      validated = false;
      conAdvFieldValue = conAdvFieldValue.trim();
      if (conAdvField.hasClass("text") && conAdvFieldValue.length > 0 && conAdvFieldValue != conAdvField.attr("title")) {
        if (conAdvFieldValue.length <= 0)
          return showError(conAdvFieldID);
        validated = true
      }
      if (conAdvField.hasClass("email") && conAdvFieldValue.length > 0 && conAdvFieldValue != conAdvField.attr("title")) {
        if (!conAdvFieldValue.match(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/))
          return showError(conAdvFieldID);
        validated = true
      }
      if (conAdvField.hasClass("number") && conAdvFieldValue.length > 0 && conAdvFieldValue != conAdvField.attr("title")) {
        if (conAdvFieldName.indexOf("at:phone") != -1 || conAdvFieldName.indexOf("at:mobile_phone") != -1 || conAdvFieldName.indexOf("at:home_phone") || conAdvFieldName.indexOf("at:business_phone") != -1) {
          if (!conAdvFieldValue.match(/^[\d\- \+\(\)\.]+$/))
            return showError(conAdvFieldID)
        } else {
          if (!conAdvFieldValue.match(/^[\d\- \+\(\)]+$/))
            return showError(conAdvFieldID)
        }
      }
      if (conAdvField.hasClass("zipcode") && conAdvFieldValue.length > 0 && conAdvFieldValue != conAdvField.attr("title")) {
        if (!conAdvFieldValue.match(/^\d+$/))
          return showError(conAdvFieldID);
        validated = true
      }
    }
    var result = validateGroups(".firstOrLast");
    if (result == false)
      return false;
    result = validateGroups(".emailOrPhone");
    if (result == false)
      return false;
    result = validateDependencyChecks(".depKey_Email", ".depValue_Email");
    if (result == false)
      return false;
    result = validateDependencyChecks(".depKey_Phone", ".depValue_Phone");
    if (result == false)
      return false;
    for (var i = 0; i < arrFields.length; i++) {
      var field = $(arrFields[i]),
        fieldValue = field.val(),
        fieldID = field.attr("id"),
        fieldName = field.attr("name"),
        validated = false;
      if (field.hasClass("text")) {
        if (!fieldValue || fieldValue == field.attr("title"))
          return showError(fieldID);
        validated = true
      }
      if (field.hasClass("email")) {
        if (!fieldValue.match(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/) || fieldValue == field.attr("title"))
          return showError(fieldID);
        validated = true
      }
      if (field.hasClass("number")) {
        if (fieldName.indexOf("at:phone") != -1 || fieldName.indexOf("at:mobile_phone") != -1 || fieldName.indexOf("at:home_phone") != -1 || fieldName.indexOf("at:business_phone") != -1) {
          if (!fieldValue.match(/^[\d\- \+\(\)\.]+$/) || fieldValue == field.attr("title"))
            return showError(fieldID)
        } else {
          if (!fieldValue.match(/^[\d\- \+\(\)]+$/) || fieldValue == field.attr("title"))
            return showError(fieldID)
        }
        validated = true
      }
      if (fieldValue.trim().length <= 0) {
        return showError(fieldID);
        validated = true
      }
      if (field.hasClass("zipcode")) {
        if (!fieldValue.match(/^\d+$/) || fieldValue == field.attr("title"))
          return showError(fieldID);
        validated = true
      }
      if (field.hasClass("select")) {
        if (fieldValue == "DID NOT RESPOND")
          return showError(fieldID);
        validated = true
      }
      if (field.hasClass("radio")) {
        var fieldName = field.attr("name");
        validated = true;
        if (!objGroups[fieldName]) {
          objGroups[fieldName] = true;
          if (!objForm.find('input[name="' + fieldName + '"]:checked').length)
            return showError(fieldID)
        }
      }
      if (field.hasClass("checkbox")) {
        var fieldName = field.attr("name");
        validated = true;
        if (!objGroups[fieldName]) {
          objGroups[fieldName] = true;
          var count = objForm.find('input[name="' + fieldName + '"]:checked').length,
            fieldClass = field.attr("class");
          if (fieldClass.indexOf("exactly") > -1) {
            if (count != fieldClass.replace(/.*(exactly)(\d+)?.*/gi, "$2"))
              return showError(fieldID)
          }
          if (fieldClass.indexOf("atLeast") > -1) {
            if (count < fieldClass.replace(/.*(atLeast)(\d+)?.*/gi, "$2"))
              return showError(fieldID)
          }
          if (fieldClass.indexOf("atMost") > -1) {
            if (count > fieldClass.replace(/.*(atMost)(\d+)?.*/gi, "$2"))
              return showError(fieldID)
          }
          if (!count && fieldClass.match(/exactly||atLeast||atMost/))
            return showError(fieldID)
        }
      }
      if (!validated && !fieldValue)
        return showError(fieldID)
    }
    function validateGroups(strClassName) {
      var validateTwoArrFields = $.makeArray(objForm.find(strClassName));
      var noOfblanktext = 0;
      for (var i = 0; i < validateTwoArrFields.length; i++) {
        var validateTwoField = $(validateTwoArrFields[i]),
          validateTwoFieldValue = validateTwoField.val(),
          validateTwoFieldID = validateTwoField.attr("id");
        if (validateTwoFieldValue.trim().length == 0 || validateTwoFieldValue == validateTwoField.attr("title")) {
          noOfblanktext = noOfblanktext + 1
        }
        if (noOfblanktext == validateTwoArrFields.length) {
          var temp_validateTwoField = $(validateTwoArrFields[0]);
          return showError(temp_validateTwoField.attr("id"))
        }
      }
      return true
    }
    function validateDependencyChecks(keyClass, valuesClass) {
      var keyFields = $.makeArray(objForm.find(keyClass));
      if (keyFields != null && keyFields.length > 0) {
        var checkBoxField = keyFields[0];
        if (checkBoxField.checked) {
          var valueFields = $.makeArray(objForm.find(valuesClass));
          for (var i = 0; i < valueFields.length; i++) {
            var valueField = $(valueFields[i]),
              valueFieldValue = valueField.val(),
              valueFieldID = valueField.attr("id");
            valueFieldValue = valueFieldValue.trim();
            if (!valueFieldValue || valueFieldValue == valueField.attr("title")) {
              return showError(valueFieldID)
            }
          }
        }
      }
      return true
    }
    return true
  }
  function showError(id) {
    $('label.formHide[for="' + id + '"]').attr("id", "formError");
    $("#formError").removeClass("formHide");
    location.href = "#formError";
    return false
  }
  $(document).ready(function () {
    $('form[id^="intakeForm"],form[id^="blogCommentForm"]').submit(function () {
      if (!formValidation($(this))) {
        $("#comment-submit").removeAttr("disabled");
        return false;
      }
      $(this).find("input[title],textarea[title]").each(function () {
        if ($(this).attr("title") == $(this).val())
          $(this).val("")
      });
      $("form").each(function () {
        addgmttime(this);
        addMarketingFields(this);
        return true
      })
    });
    $("#intakeFormShortAutofill,#intakeFormShort").each(function () {
      $("#intakeFormShortDisclaimer a").click(function () {
        $("#intakeFormShortDisclaimer").slideToggle(200)
      });
      $(this).find("a.intakeFormShortDisclaimerLink").each(function () {
        $(this).attr("href", "#intakeFormShortDisclaimer");
        $(this).click(function () {
          var estPosition = $(this)[0].offsetWidth + $(this).offset().left + 300,
            windowWidth = $(window).width(),
            positionLeft = $(this).offset().left + $(this).width() + 10;
          if (estPosition > windowWidth)
            positionLeft -= 320 + $(this).width();
          $("#intakeFormShortDisclaimer").css({
            position: "absolute",
            left: positionLeft,
            top: $(this).offset().top
          });
          $("#intakeFormShortDisclaimer").slideToggle(200)
        })
      })
    });
    $('form[id^="emailObfuscation"]').each(function () {
      $(this).submit(function () {
        if (!checkObfuscationURL())
          return false;
        if (!formValidation($(this)))
          return false;
        $("#email_subject").val($("#emailObfuscationSubject").val());
        var url = location.href;
        if (url.indexOf("attorneyName=") > -1) {
          var attorney = url.replace(/.*(attorneyName=(.*))/gi, "$2");
          attorney = attorney.replace(/%20/gi, " ");
          var subject = "FindLaw FirmSite Message for ".concat(attorney);
          $("#email_subject").val(subject)
        }
        if ($("#emailObfuscationCopyMe").attr("checked")) {
          $("#copymeEmail").val($("#emailObfuscationEmailAddress").val())
        } else
          $("#copymeEmail").val("");
        $("form").each(function () {
          addgmttime(this);
          return true
        })
      });
      function checkObfuscationURL() {
        var url = location.href;
        if (url.indexOf("JSPeditPageContent.do") > -1)
          return true;
        if (url.indexOf("guid=") > -1) {
          var guid = url.replace(/.*guid=([^=]*=).*/gi, "$1");
          $("#guid").val(guid);
          return true
        } else {
          alert("An error occured. Please use the back button on your browser and click on the e-mail link again.");
          return false
        }
      }
      checkObfuscationURL();
      $(".formHasJavaScript").removeClass("formHasJavaScript");
      $("#formNoJavaScript").remove()
    })
  });
  $('script[src$="formValidationFSP.js"]:first').attr("hasexecuted", true)
}
