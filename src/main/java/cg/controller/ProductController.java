package cg.controller;

import cg.model.Product;
import cg.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private IProductService productService;

    @GetMapping
    public ResponseEntity<Iterable<Product>> showAll() {
        Iterable<Product> products = productService.findAll();
        if (!products.iterator().hasNext()) {
            new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> showOne(@PathVariable("id") Long id) {
        Optional<Product> product = productService.findById(id);
        if (!product.isPresent()) {
            new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(product.get(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        Product product1 = productService.save(product);
        return new ResponseEntity<>(product1, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Product> deleteProduct(@PathVariable("id") Long id) {
        Optional<Product> product = productService.findById(id);
        if (!product.isPresent()) {
            new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        productService.delete(id);
        return new ResponseEntity<>(product.get(), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> editProduct(@PathVariable("id") Long id, @RequestBody Product product) {
        Optional<Product> product1 = productService.findById(id);
        if (!product1.isPresent()) {
            new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        product.setId(id);
        productService.save(product);
        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<Iterable<Product>> showAllByName(@RequestParam("search") String search) {
        Iterable<Product> products = productService.findAllByName(search);
        if (!products.iterator().hasNext()) {
            new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

}
