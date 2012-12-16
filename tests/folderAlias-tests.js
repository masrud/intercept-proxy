
var expect = require('chai').expect,
	proxy = require('../lib/proxy');

describe('folder alias', function() {

	var server;

	beforeEach(function(){
		server = proxy.createServer('www.foo.bar');
	});

	describe('#addFolder', function() {
		it('stores added folders', function() {
			server.addFolder('/images', '../../intercept-proxy');
			expect(server.folders).to.have.length(1);
		});
	});

	describe('#removeFolder', function() {
		it('removes only added folder', function() {
			server.addFolder('/images', '../../intercept-proxy');
			expect(server.folders).to.have.length(1);

			server.removeFolder('/images');
			expect(server.folders).to.have.length(0);
		});

		it('removes only correct folder', function() {
			server
				.addFolder('/images', '../../intercept-proxy')
				.addFolder('/css', '../../intercept-proxy');
			expect(server.folders).to.have.length(2);

			server.removeFolder('/images');
			expect(server.folders).to.have.length(1);
			expect(server.folders[0].path).to.equal('/css');
		});
	});

});