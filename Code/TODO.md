# TODO: Enhance Admin Dashboard with Functionality

## Updated Plan
Enhance the dashboard with interactive features: add icons to metrics cards, display recent orders in a table, and include quick actions for better functionality.

## Steps to Complete
- [x] Import necessary React hooks, Redux hooks, and UI components in dashboard.jsx
- [x] Add useEffect to dispatch fetchAllProduct and getAllOrdersForAdmin on component mount
- [x] Use useSelector to access productList and orderList from Redux state
- [x] Calculate metrics: totalProducts (length of productList), totalOrders (length of orderList), totalRevenue (sum of order totalAmount)
- [x] Render a grid of cards displaying the metrics with appropriate styling for dark theme
- [ ] Add icons to the metric cards using lucide-react
- [ ] Add a "Recent Orders" section with a table displaying the last 5 orders
- [ ] Include order details like ID, customer, status, and amount
- [ ] Add a "View Details" button for each order to navigate to order details
- [ ] Test the enhanced dashboard for functionality and interactivity
