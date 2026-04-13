package Backend.chaubisedhakaBackend.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileServiceImpl implements FileService{

    private final String DEFAULT_UPLOAD_PATH = "uploads/products/";

    @Override
    public String uploadImage(String path, MultipartFile file) throws IOException {
        String originalFileName=file.getOriginalFilename();
        String randomId= UUID.randomUUID().toString();
        String fileName=randomId.concat(originalFileName.substring(originalFileName.lastIndexOf('.')));
        String filePath=path + File.separator + fileName;
        File folder=new File(path);
        if(!folder.exists())
            folder.mkdir();
        Files.copy(file.getInputStream(), Paths.get(filePath));
        return fileName;

    }

    @Override
    public String uploadImage(MultipartFile file) {
        try {
            Path uploadPath = Paths.get(DEFAULT_UPLOAD_PATH);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            String originalFileName = file.getOriginalFilename();
            String randomId = UUID.randomUUID().toString();
            String fileName = randomId + originalFileName.substring(originalFileName.lastIndexOf('.'));

            Path filePath = uploadPath.resolve(fileName);
            Files.copy(file.getInputStream(), filePath);

            return DEFAULT_UPLOAD_PATH + fileName;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

}
