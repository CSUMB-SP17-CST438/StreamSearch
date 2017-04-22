import app, unittest, flask_testing, requests,urllib2

class ServerIntegrationTestCase(
    flask_testing.LiveServerTestCase
):
    def create_app(self):
        return app.app

    def test_server_url(self):
        r = requests.get(self.get_server_url())
        print r.url
        self.assertEquals(r.url, 'http://localhost:5000/')
    
    def test_server_is_up_and_running(self):
        response = urllib2.urlopen(self.get_server_url())
        self.assertEqual(response.code, 200)
  
    
if __name__ == '__main__':
    unittest.main()