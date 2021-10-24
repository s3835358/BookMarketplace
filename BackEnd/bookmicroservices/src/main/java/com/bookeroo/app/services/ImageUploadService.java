package com.bookeroo.app.services;

import java.io.File;
import java.nio.file.FileSystems;
import java.nio.file.Path;
import java.nio.file.Paths;

import java.io.IOException;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ImageUploadService {
    /*
    private Path root = FileSystems.getDefault().getPath("").toAbsolutePath();
    private Path backendDir = root.getParent();
    private Path projectDir = backendDir.getParent();
    private Path imagesPath = Paths.get(projectDir.toString(), "covers", "myfirstapp", "src", "components", "images");
    */

    public void uploadCover(MultipartFile cover, long id) throws IllegalStateException, IOException {
        /*
        Path coverPath = Paths.get(imagesPath.toString(), "covers");
        cover.transferTo(new File(coverPath+"/"+"cover_"+id+".jpg"));
        */
    }

    public void uploadContents(MultipartFile contents, long id) throws IllegalStateException, IOException {
        /*
        Path contentsPath = Paths.get(imagesPath.toString(), "contents");
        contents.transferTo(new File(contentsPath+"/"+"contents_"+id+".jpg"));
        */

    }
}