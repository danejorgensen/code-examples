# Ruby 2.1/Rails 4.1
# Example of a Ruby Service Object that imports spreadsheets into a Contact model

class ContactImport < ActiveModel::Model
  attr_accessor :file

  def initialize(attributes = {})
    attributes.each do |name, value|
      send("#{name}=", value)
    end
  end

  def persisted?
    false
  end

  def save
    if imported_contacts.map(&:valid?).all?
      imported_contacts.each(&:save!)
      true
    else
      imported_contacts.each_with_index do |contact, index|
        contact.errors.full_messages.each do |message|
          errors.add :base, "Row #{index+2}: #{message}"
        end
      end
      false
    end
  end

  def imported_contacts
    @imported_contacts ||= load_imported_contacts
  end

  def load_imported_contacts
    spreadsheet = open_spreadsheet
    header = spreadsheet.row(1)
    (2..spreadsheet.last_row).map do |i|
      row = Hash[[header, spreadsheet.row(i)].transpose]
      contact = Contact.new
      contact.attributes = row.to_hash_slice(*Contact.accessible_attributes)
      contact
    end
  end

  def open_spreadsheet
    case File.extname(file.original_filename)
    when ".csv" then Csv.new(file.path, nil, :ignore)
    when ".xls" then Excel.new(file.path, nil, :ignore)
    when ".xlsx" then Excelx.new(file.path, nil, :ignore)
    else raise "Unknown file type: #{file.original_filename}"
    end
  end
end
