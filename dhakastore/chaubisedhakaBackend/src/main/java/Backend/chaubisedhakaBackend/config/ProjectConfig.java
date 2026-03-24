package Backend.chaubisedhakaBackend.config;


import com.cloudinary.Cloudinary;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class ProjectConfig {

    @Bean
    public Cloudinary getCloudinary(){
        Map config=new HashMap();
        config.put("cloud_name","du3fzjgrl");
        config.put("api_key","545271612393642");
        config.put("api_secret","uvs7o_2eCz3TeBDl54Us0dUv7Nk");
        config.put("secure",true);

        return  new Cloudinary(config);
    }
}
