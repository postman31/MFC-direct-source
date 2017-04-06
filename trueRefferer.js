// direct traffic detection
// return 'TrueDirect', "Self Reffered" or referrer
// stores in cookie for 30 mins since last access
//trueDirect coockie name
function () {
  var trueDirect = document.cookie;
  var testReg = /(?:(?:^|.*;\s*)trueDirect\s*\=\s*([^;]*).*$)|^.*$/;
  trueDirect = (!trueDirect) ? [] : trueDirect.match(testReg);
    //no coockie, fresh session
    // get ref domain
    var refDomain = document.referrer;
    var refReg = /https?\:\/\/([a-z\.]+)\//;
    refDomain = (!refDomain) ? [] : refDomain.match(refReg);
  if (!trueDirect[1]) {
    trueDirect = (!refDomain[1]) ? "TrueDirect" : refDomain[1];
    if (trueDirect == document.domain) {
      // only for sessions in the moment of implementation
      trueDirect = "Own"
    }
  } else {
    // rewrite cookie if there is non own domain refferal
    // preserve cookie otherwise
    trueDirect = (refDomain[1] && (refDomain[1] != document.domain)) ? refDomain[1] : trueDirect[1];
  }
  var d = new Date();
  d.setTime(d.getTime() + 30*60*1000); // 30 mins in milliseconds expiration time

// renew coockie
  document.cookie = "trueDirect=" + trueDirect + ';path=/;expires='+d.toGMTString()+';';
  return trueDirect;
}
