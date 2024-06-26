<?php

namespace App\Form\Type;

use App\Service\VitoopSecurity;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use App\Form\Type\InputTypeSubmitType;
use App\DTO\Links\SendLinksDTO;

class SendLinksType extends AbstractType
{
    /**
     * @var VitoopSecurity
     */
    private $vitoopSecurity;

    /**
     * SendLinksType constructor.
     * @param VitoopSecurity $vitoopSecurity
     */
    public function __construct(VitoopSecurity $vitoopSecurity)
    {
        $this->vitoopSecurity = $vitoopSecurity;
    }

    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('email', EmailType::class, [
                'label' => false, 
                'attr' => [
                    'placeholder' => 'Email'
                ]
            ])
            ->add('emailSubject', TextType::class, [
                'label' => false, 
                'attr' => [
                    'placeholder' => 'label.subject'
                ]])
            ->add('resourceIds', HiddenType::class)
            ->add('comments', HiddenType::class)
            ->add('textBody', TextareaType::class, [
                'label' => false,
                'attr' => [
                    'placeholder' => 'Hier kannst Du eine Email verschicken, in der die angehakten Datensätze mit aufgeführt sind. Als Absender wird die Email-Adresse verwendet, die Du bei der Anmeldung angegeben hast. Sie kann im Benutzermanagement (Button oben im Header rechts) geändert werden.'
                ]
            ])
            ->add('save', InputTypeSubmitType::class, ['label' => 'Senden']);

        if ($this->vitoopSecurity->isAdmin()) {
            $builder->add('dataTransfer', CheckboxType::class, ['label' => 'Data transfer', 'required'=> false, 'attr' => ['class' => 'simple-checkbox']]);
        }
    }

    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => SendLinksDTO::class
        ]);
    }
}
