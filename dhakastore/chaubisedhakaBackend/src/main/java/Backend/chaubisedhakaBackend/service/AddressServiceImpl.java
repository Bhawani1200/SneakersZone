package Backend.chaubisedhakaBackend.service;

import Backend.chaubisedhakaBackend.exceptions.ResourceNotFoundException;
import Backend.chaubisedhakaBackend.model.Address;
import Backend.chaubisedhakaBackend.model.Order;
import Backend.chaubisedhakaBackend.model.User;
import Backend.chaubisedhakaBackend.payload.AddressDTO;
import Backend.chaubisedhakaBackend.repositories.AddressRepository;
import Backend.chaubisedhakaBackend.repositories.OrderRepository;
import Backend.chaubisedhakaBackend.repositories.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddressServiceImpl implements AddressService{

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    AddressRepository addressRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Override
    public AddressDTO createAddress(AddressDTO addressDTO, User user) {
        Address address=modelMapper.map(addressDTO,Address.class);

        List<Address> addressesList=user.getAddresses();
        addressesList.add(address);
        user.setAddresses(addressesList);
        address.setUser(user);
        Address savedAddress=addressRepository.save(address);
        return modelMapper.map(savedAddress,AddressDTO.class);

    }

    @Override
    public List<AddressDTO> getAddresses() {
        List<Address>addresses=addressRepository.findAll();
        return addresses.stream().map(address->modelMapper.map(address,AddressDTO.class))
                .toList();
    }

    @Override
    public AddressDTO getAddressesById(Long addressId) {
        Address address=addressRepository.findById(addressId)
                .orElseThrow(()->new ResourceNotFoundException("Address","adddressId",addressId));
        return modelMapper.map(address,AddressDTO.class);
    }

    @Override
    public List<AddressDTO> getUserAddresses(User user) {
        List<Address>addresses=user.getAddresses();
        return addresses.stream().map(address ->
                modelMapper.map(address,AddressDTO.class))
                .toList();
    }

    @Override
    public AddressDTO updateAddress(Long addressId, AddressDTO addressDTO) {
        Address addFromDatabase=addressRepository.findById(addressId)
                .orElseThrow(()->new ResourceNotFoundException("Address","addressId",addressId));

        addFromDatabase.setCity(addressDTO.getCity());
        addFromDatabase.setState(addressDTO.getState());
        addFromDatabase.setCountry(addressDTO.getCountry());
        addFromDatabase.setPincode(addressDTO.getPincode());
        addFromDatabase.setNagarOrGaupalika(addressDTO.getNagarOrGaupalika());
        addFromDatabase.setWardNo(addressDTO.getWardNo());
        addFromDatabase.setStreet(addressDTO.getStreet());

        Address updatedAddress=addressRepository.save(addFromDatabase);

        User user=addFromDatabase.getUser();
        user.getAddresses().removeIf(address -> address.getAddressId().equals(addressId));
        user.getAddresses().add(updatedAddress);
        userRepository.save(user);

        return modelMapper.map(updatedAddress,AddressDTO.class);
    }

    @Override
    public String deleteAddress(Long addressId) {
        Address addFromDatabase=addressRepository.findById(addressId)
                .orElseThrow(()->new ResourceNotFoundException("Address","addressId",addressId));


        List<Order> orders = orderRepository.findByAddress(addFromDatabase);
        orders.forEach(order -> order.setAddress(null));
        orderRepository.saveAll(orders);

        User user=addFromDatabase.getUser();
        user.getAddresses().removeIf(address -> address.getAddressId().equals(addressId));
        userRepository.save(user);
        addressRepository.delete(addFromDatabase);

        return "Address deleted successfully with addressId: "+addressId;
    }
}
