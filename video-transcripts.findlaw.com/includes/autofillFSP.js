$('script[src$="autofillFSP.js"]:first').attr("hasexecuted")||($(document).ready(function(){$(".formAutoFill").each(function(){$(this).find('input[type="text"],textarea').focus(function(){$(this).val()==$(this).attr("title")&&$(this).val(""),$(this).css({fontWeight:"normal"})}),$(this).find("input:text,textarea").blur(function(){$(this).val()||$(this).val($(this).attr("title")),$(this).val()==$(this).attr("title")&&$(this).parent().parent().find('label[for="'+$(this).attr("id")+'"] strong').length&&$(this).css({fontWeight:"bold"})}),$(this).find('input[type="text"],textarea').each(function(){var t=$(this).parent().parent().find('label[for="'+$(this).attr("id")+'"]:not(.formHide)');t.find('input[type="text"]').length||t.addClass("formLabelHide"),$(this).val($(this).attr("title")),t.find("strong").length&&$(this).css({fontWeight:"bold"})})})}),$('script[src$="autofillFSP.js"]:first').attr("hasexecuted",!0));