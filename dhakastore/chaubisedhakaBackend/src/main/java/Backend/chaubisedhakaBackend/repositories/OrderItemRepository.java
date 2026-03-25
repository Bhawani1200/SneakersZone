package Backend.chaubisedhakaBackend.repositories;

import Backend.chaubisedhakaBackend.model.Order;
import Backend.chaubisedhakaBackend.model.OrderItem;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem ,Long> {

    @Modifying
    @Transactional
    @Query("DELETE FROM OrderItem oi WHERE oi.product.productId = :productId")
    void deleteByProductId(Long productId);

    @Query("SELECT DISTINCT oi.order FROM OrderItem oi WHERE oi.product.productId = :productId")
    List<Order> findOrdersByProductId(Long productId);
}
