package Backend.chaubisedhakaBackend.service;

import Backend.chaubisedhakaBackend.payload.OrderDTO;
import Backend.chaubisedhakaBackend.payload.OrderResponse;

public interface OrderService {

    OrderDTO placeOrder(String emailId, Long addressId, String paymentMethod, String pgName, String pgPaymentId, String pgStatus, String pgResponseMessage);

    OrderResponse getAllOrders(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);

    OrderDTO updateOrder( Long orderId, String status);

    OrderResponse getAllSellerOrders(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);

    String deleteOrder(Long orderId);
}
