package Backend.chaubisedhakaBackend.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface FileService {
    String uploadImage(String path, MultipartFile file) throws IOException;

    String uploadImage(MultipartFile image);
}
