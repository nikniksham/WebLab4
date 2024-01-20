package hueta.weblab4;

import org.apache.http.HttpEntity;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200/special")
public class TryToFixFuckingCors {
    @RequestMapping("/CorsPidaras/{code}")
    public String popitka(@PathVariable("code") String code) {
        String result = "{\"error\": \"some error\"}";
//        String result = "!WALFASFasfasfasfafs";
        try {

            final CloseableHttpClient httpclient = HttpClients.createDefault();

            HttpPost httpPost = new HttpPost("http://localhost:8080/realms/lab4-realm/protocol/openid-connect/token");
            // http://localhost:8080/realms/lab4-realm/protocol/openid-connect/logout?post_logout_redirect_uri=http://localhost:4200/login-page&client_id=assfsaf
            final List<NameValuePair> params = new ArrayList<>();
            params.add(new BasicNameValuePair("grant_type", "authorization_code"));
            params.add(new BasicNameValuePair("client_id", "base-client"));
            params.add(new BasicNameValuePair("client_secret", "mH2ZcjT91khnzxA67DrWgz1a1miB1dXc"));
            params.add(new BasicNameValuePair("code", code));
            params.add(new BasicNameValuePair("redirect_uri", "http://localhost:4200/special"));
            httpPost.setEntity(new UrlEncodedFormEntity(params));

            try (
                    CloseableHttpResponse response2 = httpclient.execute(httpPost)
            ){
                final HttpEntity entity2 = response2.getEntity();
                result = EntityUtils.toString(entity2);
//                System.out.println(EntityUtils.toString(entity2));
            }
            httpclient.close();

        } catch (Exception e) {
//            System.out.println(e.toString());
        }
//        System.out.println(result);
        return result;
    }
}
