# Ruby 2.1/Rails 4.1
# Example of a Ruby Query Object

# app/objects/report/customer/base.rb
module Report
  module Customer
    class Base
      def initialize(attributes = {})
        @relation = attributes.fetch(:relation) { ::Customer.all }

        # Do stuff here ...
      end
    end
  end
end

# app/objects/report/customer/partner_report.rb
module Report
  module Customer
    class PartnerReport < Base
      def initialize(attributes = {})
        @partner_id = attributes.fetch(:partner_id) #Raise KeyError
        super(attributes)
      end

      def total
        @relation.select('id')
          .joins('INNER JOIN partners ON customers.partner_id = partners.id')
          .where('customers.partner_id = ?', @partner_id)
          .count
      end
    end
  end
end

### Usage ###
# Total count of customers signed up by Partner 1
total = Report::Customer::PartnerReport.new({ partner_id: 1 }).total
