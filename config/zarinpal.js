/**
 * zarinpal-checkout • Simple implementation of ZarinPal Node.js. so you can quickly start using API.
 * @author Siamak Mokhtari <hi@siamak.work>
 * @date 4/26/15.
 */
const axios = require('axios');
var config  = require('./config');

/**
 * Constructor for ZarinPal object.
 * @param {String} MerchantID
 * @param {bool} sandbox
 */
function ZarinPal(MerchantID, sandbox) {
  if(typeof MerchantID !== 'string'){
      throw new Error("MerchantId is invalid");
  }
	if (MerchantID.length === config.merchantIDLength) {
		this.merchant = MerchantID;
	} else {
		console.error('The MerchantID must be ' + config.merchantIDLength + ' Characters.');
	}
	this.sandbox = sandbox || false;

	this.url = (sandbox === true) ? config.sandbox : config.https;
}


/**
 * Get Authority from ZarinPal
 * @param  {number} Amount [Amount on Tomans.]
 * @param  {String} CallbackURL
 * @param  {String} Description
 * @param  {String} Email
 * @param  {String} Mobile
 */
ZarinPal.prototype.PaymentRequest = function(input) {
	var self = this;

	var params = {
		MerchantID: self.merchant,
		Amount: input.Amount,
		CallbackURL: input.CallbackURL,
		Description: input.Description,
		Email: input.Email,
		Mobile: input.Mobile
  };

	var promise = new Promise(function (resolve, reject) {
		self.request(self.url, config.API.PR, 'POST', params).then(function (data) {
			resolve({
				status: data.Status,
				authority: data.Authority,
				url: config.PG(self.sandbox) + data.Authority
			});
		}).catch(function (err) {
			reject(err);
		});
	});

	return promise;
};


/**
 * Validate Payment from Authority.
 * @param  {number} Amount
 * @param  {String} Authority
 */
ZarinPal.prototype.PaymentVerification = async function(input) {
	var self = this;
	var params = {
		MerchantID: self.merchant,
		Amount: input.Amount,
		Authority: input.Authority
	};
   
	var promise = new Promise(function (resolve, reject) {
		self.request(self.url, config.API.PV, 'POST', params).then(function (data) {
			resolve({
				status: data.Status,
				RefID: data.RefID
			});
		}).catch(function (err) {
			reject(err);
		});
	});

	return promise;
};


/**
 * Get Unverified Transactions
 * @param  {number} Amount
 * @param  {String} Authority
 */
ZarinPal.prototype.UnverifiedTransactions = function() {
	var self = this;
	var params = {
		MerchantID: self.merchant
	};

	var promise = new Promise(function (resolve, reject) {
		self.request(self.url, config.API.UT, 'POST', params).then(function (data) {
			resolve({
				status: data.Status,
				authorities: data.Authorities
			});
		}).catch(function (err) {
			reject(err);
		});
	});

	return promise;
};


/**
 * Refresh Authority
 * @param  {number} Amount
 * @param  {String} Authority
 */
ZarinPal.prototype.RefreshAuthority = function(input) {
	var self = this;
	var params = {
		MerchantID: self.merchant,
		Authority: input.Authority,
		ExpireIn: input.Expire
	};

	var promise = new Promise(function (resolve, reject) {
		self.request(self.url, config.API.RA, 'POST', params).then(function (data) {
			resolve({
				status: data.Status
			});
		}).catch(function (err) {
			reject(err);
		});
	});

	return promise;
};


/**
 * `request` module with ZarinPal structure.
 * @param  {String}   url
 * @param  {String}   module
 * @param  {String}   method
 * @param  {String}   data
 * @param  {Function} callback
 */
ZarinPal.prototype.request = async function (url, module, method, data) {
  url = url + module;
  try {
    const response = await axios.request({
      url,
      method,
      data
    });
    return response.data;
  } catch (error) {
    if (error?.response?.data) throw error?.response?.data;
    else throw error;
  }
};


/**
 * Remove EXTRA ooooo!
 * @param {number} token [API response Authority]
 */
ZarinPal.prototype.TokenBeautifier = function (token) {
	return token.split(/\b0+/g);
};


/**
 * Export version module.
 */
exports.version = require('../package.json').version;


/**
 * Create ZarinPal object. Wrapper around constructor.
 */
exports.create = function(MerchantID, sandbox) {
	return new ZarinPal(MerchantID, sandbox);
};
