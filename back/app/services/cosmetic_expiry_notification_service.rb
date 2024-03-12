class CosmeticExpiryNotificationService
  ITEM_TYPE_JAPANESE = {
    'lotion' => '化粧水',
    'serum' => '美容液',
    'cream' => 'クリーム',
  }.freeze

  def self.send_notification
    CosmeticUsage.find_each do |cosmetic|
      next unless cosmetic.expiry_date

      days_before_expiry = (cosmetic.expiry_date - Date.today).to_i
      item_type_japanese = ITEM_TYPE_JAPANESE[cosmetic.item_type] || cosmetic.item_type

      message = case days_before_expiry
        when 5
          "【お知らせ】\n現在使用している #{item_type_japanese} の使用期限が5日後になりました！"
        when 3
          "【お知らせ】\n現在使用している #{item_type_japanese} の使用期限が3日後になりました！"
        when 1
          "【お知らせ】\n現在使用している #{item_type_japanese} の使用期限が明日になりました！"
        else
          nil
        end

      if message
        user = User.find(cosmetic.user_id)
        LineNotifyService.send_message(user.uid, message) if user.uid.present?
      end
    end
  end
end
